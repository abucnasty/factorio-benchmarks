/**
 * Git LFS Batch API server backed by Cloudflare R2.
 *
 * Implements the Git LFS basic transfer protocol:
 *   POST /objects/batch  — batch API (returns download/upload URLs)
 *   GET  /objects/:oid   — proxy download from R2
 *   PUT  /objects/:oid   — proxy upload to R2 (requires Bearer token)
 *   POST /objects/:oid/verify — verify upload completed
 *
 * Downloads are public.
 * Uploads require Authorization: Bearer <LFS_UPLOAD_TOKEN>.
 */

export interface Env {
  R2_BUCKET: R2Bucket;
  /** Set via: wrangler secret put LFS_UPLOAD_TOKEN */
  LFS_UPLOAD_TOKEN: string;
}

const LFS_MEDIA_TYPE = "application/vnd.git-lfs+json";
const OID_RE = /^[0-9a-f]{64}$/;

// Maps a 64-char SHA-256 OID to its R2 key path (mirrors git-lfs object layout)
function r2Key(oid: string): string {
  return `${oid.slice(0, 2)}/${oid.slice(2, 4)}/${oid}`;
}

function isValidOid(oid: string): boolean {
  return OID_RE.test(oid);
}

function lfsJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": `${LFS_MEDIA_TYPE}; charset=utf-8`,
      "Cache-Control": "no-store",
    },
  });
}

function unauthorized(message = "Credentials required"): Response {
  return lfsJson({ message }, 401);
}

function extractToken(request: Request): string {
  const auth = request.headers.get("Authorization") ?? "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : auth;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { method } = request;
    const { pathname } = url;

    // POST /objects/batch
    if (method === "POST" && pathname === "/objects/batch") {
      return handleBatch(request, env, url);
    }

    // /objects/:oid  and  /objects/:oid/verify
    const oidMatch = pathname.match(
      /^\/objects\/([0-9a-f]{64})(\/verify)?$/
    );
    if (oidMatch) {
      const oid = oidMatch[1];
      const isVerify = !!oidMatch[2];

      if (isVerify && method === "POST") {
        return handleVerify(request, oid, env);
      }
      if (!isVerify && (method === "GET" || method === "HEAD")) {
        return handleDownload(method, oid, env);
      }
      if (!isVerify && method === "PUT") {
        return handleUpload(request, oid, env);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

// ---------------------------------------------------------------------------
// Batch API
// ---------------------------------------------------------------------------

interface LfsObject {
  oid: string;
  size: number;
}

async function handleBatch(
  request: Request,
  env: Env,
  url: URL
): Promise<Response> {
  if (!request.headers.get("Content-Type")?.startsWith(LFS_MEDIA_TYPE)) {
    return lfsJson({ message: "Unsupported Media Type" }, 415);
  }

  let body: { operation: string; objects: LfsObject[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return lfsJson({ message: "Invalid JSON body" }, 422);
  }

  const { operation, objects } = body;
  if (!operation || !Array.isArray(objects)) {
    return lfsJson({ message: "Missing operation or objects" }, 422);
  }

  const isUpload = operation === "upload";
  const baseUrl = `${url.protocol}//${url.host}`;

  if (isUpload) {
    const token = extractToken(request);
    if (!token || token !== env.LFS_UPLOAD_TOKEN) {
      return unauthorized();
    }
  }

  const responseObjects = await Promise.all(
    objects.map((obj) => buildObjectResponse(obj, isUpload, baseUrl, env))
  );

  return lfsJson({ transfer: "basic", objects: responseObjects });
}

async function buildObjectResponse(
  obj: LfsObject,
  isUpload: boolean,
  baseUrl: string,
  env: Env
): Promise<unknown> {
  const { oid, size } = obj;

  if (!isValidOid(oid)) {
    return { oid, size, error: { code: 422, message: "Invalid OID" } };
  }

  if (isUpload) {
    // If already present in R2, signal that no upload is needed
    const existing = await env.R2_BUCKET.head(r2Key(oid));
    if (existing) {
      return { oid, size, authenticated: true };
    }
    return {
      oid,
      size,
      authenticated: true,
      actions: {
        upload: {
          href: `${baseUrl}/objects/${oid}`,
          header: { Authorization: `Bearer ${env.LFS_UPLOAD_TOKEN}` },
          expires_in: 3600,
        },
        verify: {
          href: `${baseUrl}/objects/${oid}/verify`,
          header: { Authorization: `Bearer ${env.LFS_UPLOAD_TOKEN}` },
          expires_in: 3600,
        },
      },
    };
  }

  // Download — check existence so clients get a clean error rather than a
  // surprise 404 when they try to fetch
  const exists = await env.R2_BUCKET.head(r2Key(oid));
  if (!exists) {
    return { oid, size, error: { code: 404, message: "Object not found" } };
  }
  return {
    oid,
    size,
    authenticated: false,
    actions: {
      download: {
        href: `${baseUrl}/objects/${oid}`,
        expires_in: 3600,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

async function handleDownload(
  method: string,
  oid: string,
  env: Env
): Promise<Response> {
  const object = await env.R2_BUCKET.get(r2Key(oid));
  if (!object) {
    return new Response("Object not found", { status: 404 });
  }

  const headers = new Headers({
    "Content-Type": "application/octet-stream",
    "Content-Length": object.size.toString(),
    "X-Content-Type-Options": "nosniff",
  });

  // HEAD — return metadata only
  if (method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }

  return new Response(object.body, { headers });
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

async function handleUpload(
  request: Request,
  oid: string,
  env: Env
): Promise<Response> {
  const token = extractToken(request);
  if (!token || token !== env.LFS_UPLOAD_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!request.body) {
    return new Response("Empty request body", { status: 400 });
  }

  await env.R2_BUCKET.put(r2Key(oid), request.body, {
    httpMetadata: { contentType: "application/octet-stream" },
    customMetadata: { lfsOid: oid },
  });

  return new Response(null, { status: 200 });
}

// ---------------------------------------------------------------------------
// Verify
// ---------------------------------------------------------------------------

async function handleVerify(
  request: Request,
  oid: string,
  env: Env
): Promise<Response> {
  const token = extractToken(request);
  if (!token || token !== env.LFS_UPLOAD_TOKEN) {
    return unauthorized();
  }

  const exists = await env.R2_BUCKET.head(r2Key(oid));
  if (!exists) {
    return lfsJson({ message: "Object not found" }, 404);
  }

  return lfsJson({ message: "ok" }, 200);
}
