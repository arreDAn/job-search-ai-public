import { useEffect, useRef } from 'react';

export default function WireframeMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const COLS = 26;
    const ROWS = 18;
    const SEP = 36;

    const resize = () => {
      canvas.width = canvas.offsetWidth || 800;
      canvas.height = canvas.offsetHeight || 420;
    };
    resize();
    window.addEventListener('resize', resize);

    // Perspective projection
    const proj = (x, y, z) => {
      const f = 460;
      const d = 600;
      const s = f / (d + z);
      return {
        x: canvas.width / 2 + x * s,
        y: canvas.height / 2 + y * s,
      };
    };

    // u=0 → cyan (#00e5ff), u=1 → magenta (#ff4081)
    const col = (u, alpha) => {
      const r = Math.round(u * 255);
      const g = Math.round((1 - u) * 200 * 0.55);
      const b = Math.round((1 - u) * 255 + u * 130);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.006;

      const ry = t * 0.32;
      const rx = 0.4;
      const [cy, sy] = [Math.cos(ry), Math.sin(ry)];
      const [cx, sx] = [Math.cos(rx), Math.sin(rx)];

      const pts = Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
          let x = (c - COLS / 2) * SEP;
          let y =
            Math.sin(c * 0.5 + t * 1.7) * 42 +
            Math.sin(r * 0.42 + t * 1.1) * 24;
          let z = (r - ROWS / 2) * SEP;

          // Rotate Y
          [x, z] = [x * cy - z * sy, x * sy + z * cy];
          // Rotate X
          [y, z] = [y * cx - z * sx, y * sx + z * cx];

          return { ...proj(x, y, z + 300), u: c / (COLS - 1) };
        })
      );

      ctx.lineWidth = 0.9;

      // Horizontal lines
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const a = pts[r][c];
          const b = pts[r][c + 1];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = col((a.u + b.u) / 2, 0.82);
          ctx.stroke();
        }
      }

      // Vertical lines (slightly dimmer)
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          const a = pts[r][c];
          const b = pts[r + 1][c];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = col(a.u, 0.38);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="wireframe-canvas" />;
}
