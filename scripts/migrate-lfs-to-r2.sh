#!/usr/bin/env bash
# migrate-lfs-to-r2.sh
#
# Full backfill: uploads every git-lfs object (all refs, all history) to
# Cloudflare R2 using the S3-compatible API.
#
# Prerequisites:
#   - git-lfs installed and configured
#   - aws CLI installed  (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
#   - GitHub LFS access still active (needed for git lfs fetch --all)
#
# Required environment variables:
#   R2_ACCOUNT_ID        — Cloudflare account ID (from R2 dashboard URL)
#   R2_ACCESS_KEY_ID     — R2 API token Access Key ID
#   R2_SECRET_ACCESS_KEY — R2 API token Secret Access Key
#   R2_BUCKET            — R2 bucket name (e.g. factorio-benchmarks-lfs)
#
# Usage:
#   R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... \
#     R2_BUCKET=factorio-benchmarks-lfs ./scripts/migrate-lfs-to-r2.sh

set -euo pipefail

# ---------------------------------------------------------------------------
# Validate required env vars
# ---------------------------------------------------------------------------
: "${R2_ACCOUNT_ID:?'R2_ACCOUNT_ID is required'}"
: "${R2_ACCESS_KEY_ID:?'R2_ACCESS_KEY_ID is required'}"
: "${R2_SECRET_ACCESS_KEY:?'R2_SECRET_ACCESS_KEY is required'}"
: "${R2_BUCKET:?'R2_BUCKET is required'}"

ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

# ---------------------------------------------------------------------------
# Locate repo root and LFS objects directory
# ---------------------------------------------------------------------------
REPO_ROOT=$(git rev-parse --show-toplevel)
LFS_OBJECTS="${REPO_ROOT}/.git/lfs/objects"

if [[ ! -d "$LFS_OBJECTS" ]]; then
  echo "Error: ${LFS_OBJECTS} not found." >&2
  echo "       Make sure git-lfs is installed and this is a git repo." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Step 1: fetch ALL LFS objects across all refs and history
# ---------------------------------------------------------------------------
echo "========================================"
echo " Step 1: git lfs fetch --all"
echo "========================================"
echo "Fetching all LFS objects from GitHub (this may take a while)..."
git -C "$REPO_ROOT" lfs fetch --all
echo ""

# ---------------------------------------------------------------------------
# Step 2: bulk upload to R2 via aws s3 sync
# ---------------------------------------------------------------------------
echo "========================================"
echo " Step 2: Upload to R2"
echo "========================================"
echo "  Bucket  : ${R2_BUCKET}"
echo "  Endpoint: ${ENDPOINT}"
echo "  Source  : ${LFS_OBJECTS}"
echo ""

# aws s3 sync preserves the ab/cd/<oid> directory structure.
# --size-only: skip objects whose size already matches in R2 (idempotent).
# --exclude tmp/*: don't upload git-lfs temporary files.
AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
AWS_DEFAULT_REGION="auto" \
  aws s3 sync "${LFS_OBJECTS}" "s3://${R2_BUCKET}" \
    --endpoint-url "${ENDPOINT}" \
    --exclude "tmp/*" \
    --size-only \
    --no-progress

echo ""

# ---------------------------------------------------------------------------
# Step 3: verify object counts match
# ---------------------------------------------------------------------------
echo "========================================"
echo " Step 3: Verification"
echo "========================================"

LOCAL_COUNT=$(find "${LFS_OBJECTS}" -type f -not -path "*/tmp/*" | wc -l | tr -d ' ')

R2_COUNT=$(
  AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
  AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
  AWS_DEFAULT_REGION="auto" \
    aws s3 ls "s3://${R2_BUCKET}" \
      --endpoint-url "${ENDPOINT}" \
      --recursive \
  | wc -l | tr -d ' '
)

echo "  Local LFS objects : ${LOCAL_COUNT}"
echo "  R2 objects        : ${R2_COUNT}"

if [[ "${LOCAL_COUNT}" -ne "${R2_COUNT}" ]]; then
  echo ""
  echo "WARNING: count mismatch (local=${LOCAL_COUNT}, r2=${R2_COUNT})."
  echo "         Re-run this script to sync any remaining objects."
  exit 1
fi

echo ""
echo "All ${LOCAL_COUNT} objects are present in R2."

# ---------------------------------------------------------------------------
# Step 4: integrity spot-check (5 random objects)
# ---------------------------------------------------------------------------
echo ""
echo "========================================"
echo " Step 4: Integrity spot-check (5 objects)"
echo "========================================"

TMPDIR_SPOT=$(mktemp -d)
trap 'rm -rf "${TMPDIR_SPOT}"' EXIT

# Collect 5 random object files (exclude tmp/)
mapfile -t SAMPLE < <(
  find "${LFS_OBJECTS}" -type f -not -path "*/tmp/*" | shuf -n 5
)

ALL_PASS=true
for LOCAL_FILE in "${SAMPLE[@]}"; do
  OID=$(basename "${LOCAL_FILE}")
  R2_PATH="${OID:0:2}/${OID:2:2}/${OID}"
  REMOTE_FILE="${TMPDIR_SPOT}/${OID}"

  AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
  AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
  AWS_DEFAULT_REGION="auto" \
    aws s3 cp "s3://${R2_BUCKET}/${R2_PATH}" "${REMOTE_FILE}" \
      --endpoint-url "${ENDPOINT}" \
      --quiet

  LOCAL_HASH=$(sha256sum "${LOCAL_FILE}" | cut -d' ' -f1)
  REMOTE_HASH=$(sha256sum "${REMOTE_FILE}" | cut -d' ' -f1)

  if [[ "${LOCAL_HASH}" == "${OID}" && "${LOCAL_HASH}" == "${REMOTE_HASH}" ]]; then
    echo "  PASS  ${OID}"
  else
    echo "  FAIL  ${OID}"
    echo "        expected : ${OID}"
    echo "        local    : ${LOCAL_HASH}"
    echo "        remote   : ${REMOTE_HASH}"
    ALL_PASS=false
  fi
done

echo ""
if ${ALL_PASS}; then
  echo "Spot-check passed. Migration is complete."
  echo ""
  echo "Next step: update .lfsconfig to point git-lfs at the new R2-backed Worker."
else
  echo "Spot-check FAILED. Investigate the mismatches above before switching .lfsconfig."
  exit 1
fi
