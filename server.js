const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const hostname = process.env.HOST;
const port = process.env.PORT;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})