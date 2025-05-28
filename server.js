const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 9005;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`Yêu cầu: ${req.method} ${req.url}`);
  
  // Xử lý URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Lấy extension của file
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Đọc file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Không tìm thấy file
        fs.readFile('./index.html', (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Lỗi server: ' + err.code);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Lỗi server
        res.writeHead(500);
        res.end('Lỗi server: ' + err.code);
      }
    } else {
      // Trả về nội dung file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
