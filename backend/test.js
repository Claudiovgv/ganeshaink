const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', node: process.version }));
});
server.listen(process.env.PORT || 3001, () => {
  console.log('Test server running');
});
