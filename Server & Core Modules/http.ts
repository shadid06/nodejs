import http from 'node:http';

const server = http.createServer((req,res)=>{
    if(req.url==='/')
    {
        res.write('hello world');
    res.end();
    }
    else if(req.url==='/about')
    {
        res.write('this is about page');
    res.end();
    }
    else{
        res.write('404 not found');
    res.end();
    }
});

// server.on('connection',()=>{
//     console.log('new connection');
// });


server.listen(3000);

console.log('listening on port 3000');
