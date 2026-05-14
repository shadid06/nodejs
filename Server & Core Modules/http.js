import http from 'node:http';
const server = http.createServer((req, res) => {
    if (req.url === '/')
        res.write('hello world');
    res.end();
});
// server.on('connection',()=>{
//     console.log('new connection');
// });
server.listen(3000);
console.log('listening on port 3000');
