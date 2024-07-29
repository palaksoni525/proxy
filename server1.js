const http = require('http');

const server1 = http.createServer((req, res) => {
    if (req.url === '/api/data' && req.method === 'GET') {
        // Options for the request to server2
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/data',
            method: 'GET',
            headers: req.headers,
        };

        // Create the request to server2
        const proxy = http.request(options, (proxyRes) => {
            let data = '';

            // Collect response data from server2
            proxyRes.on('data', (chunk) => {
                data += chunk;
            });

            // Once all data is received from server2, send it to the client
            proxyRes.on('end', () => {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                res.end(data);
            });
        });

        // Handle errors from the request to server2
        proxy.on('error', (e) => {
            console.error(`Problem with request to server2: ${e.message}`);
            res.writeHead(500);
            res.end(`Server1 encountered an error: ${e.message}`);
        });

        // End the proxy request
        proxy.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server1.listen(3000, () => {
    console.log('Server1 listening on port 3000');
});