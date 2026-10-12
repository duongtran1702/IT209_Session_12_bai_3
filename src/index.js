const http = require('http');

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'staging';
const VERSION = process.env.APP_VERSION || '1.0.0';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'UP', environment: ENVIRONMENT, timestamp: new Date().toISOString() }));
  }

  if (req.url === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      app: 'Multi-Environment Service',
      environment: ENVIRONMENT,
      version: VERSION,
      deployedAt: new Date().toISOString(),
      student: 'Trần Trí Dương',
      studentId: 'duongtran1702'
    }));
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Hệ thống Đa môi trường: ${ENVIRONMENT.toUpperCase()}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .card { background: #1e293b; padding: 2.5rem; border-radius: 1rem; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); max-width: 500px; text-align: center; }
        .badge { display: inline-block; padding: 0.35rem 0.85rem; border-radius: 9999px; font-weight: 700; font-size: 0.875rem; margin-bottom: 1rem; text-transform: uppercase; }
        .badge-staging { background: #0284c7; color: white; }
        .badge-production { background: #16a34a; color: white; }
        h1 { margin: 0 0 1rem; font-size: 1.5rem; }
        p { color: #94a3b8; line-height: 1.6; margin: 0.5rem 0; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge badge-${ENVIRONMENT}">${ENVIRONMENT}</span>
        <h1>Multi-Environment Deployment Live</h1>
        <p>Hệ thống tự động điều phối qua GitHub Actions & GitHub Environments.</p>
        <p><strong>Phiên bản:</strong> ${VERSION} | <strong>Cổng:</strong> ${PORT}</p>
        <p>Học viên: Trần Trí Dương (@duongtran1702)</p>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${ENVIRONMENT} mode`);
});
