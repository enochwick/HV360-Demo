import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  const requestPath = req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(__dirname, requestPath);
  if (!fs.existsSync(filePath)) { res.writeHead(404); return res.end('Not found'); }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`));
