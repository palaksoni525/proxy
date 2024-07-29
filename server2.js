const http = require('http');

const server2 = http.createServer((req, res) => {
    if (req.url === '/api/data' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello from Server2' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server2.listen(3001, () => {
    console.log('Server2 listening on port 3001');
});