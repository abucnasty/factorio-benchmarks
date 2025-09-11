import { createCanvas } from 'canvas';

export type ShapeType = 'plus'|'cross'|'dash'|'cross-dash'|'dot'|'dot-dash'|'disc'|'ring'|
 'line'|'line-vertical'|'weave'|'zigzag'|'zigzag-vertical'|
 'diagonal'|'diagonal-right-left'|'square'|'box'|
 'triangle'|'triangle-inverted'|'diamond'|'diamond-box';

/**
 * Utility to create pattern fills (Node.js friendly).
 * Matches the signature of patternomaly's draw().
 */
export function draw(shape: ShapeType, color: string, background: string = 'transparent'): CanvasPattern {
  const size = 20;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  switch (shape) {
    case 'plus':
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size);
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size, size / 2);
      ctx.stroke();
      break;

    case 'cross':
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size);
      ctx.moveTo(size, 0);
      ctx.lineTo(0, size);
      ctx.stroke();
      break;

    case 'dash':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.stroke();
      break;

    case 'cross-dash':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size / 2);
      ctx.stroke();
      break;

    case 'dot':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 2, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'dot-dash':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.stroke();
      break;

    case 'disc':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'ring':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'line':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size, size / 2);
      ctx.stroke();
      break;

    case 'line-vertical':
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size);
      ctx.stroke();
      break;

    case 'weave':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size, size / 2);
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size);
      ctx.stroke();
      break;

    case 'zigzag':
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(size, size);
      ctx.stroke();
      break;

    case 'zigzag-vertical':
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(0, size);
      ctx.stroke();
      break;

    case 'diagonal':
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size, 0);
      ctx.stroke();
      break;

    case 'diagonal-right-left':
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size);
      ctx.stroke();
      break;

    case 'square':
      ctx.beginPath();
      ctx.rect(size / 4, size / 4, size / 2, size / 2);
      ctx.stroke();
      break;

    case 'box':
      ctx.beginPath();
      ctx.rect(size / 4, size / 4, size / 2, size / 2);
      ctx.fill();
      break;

    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fill();
      break;

    case 'triangle-inverted':
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.lineTo(size / 2, size);
      ctx.closePath();
      ctx.fill();
      break;

    case 'diamond':
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(size / 2, size);
      ctx.lineTo(0, size / 2);
      ctx.closePath();
      ctx.stroke();
      break;

    case 'diamond-box':
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(size / 2, size);
      ctx.lineTo(0, size / 2);
      ctx.closePath();
      ctx.fill();
      break;

    default:
      throw new Error(`Unknown pattern shape: ${shape}`);
  }

  return ctx.createPattern(canvas, 'repeat');
}
