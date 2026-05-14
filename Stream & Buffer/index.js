// youtube: https://www.youtube.com/watch?v=BPdRVquo5pg
import fs from 'node:fs';
const myReadStream = fs.createReadStream(`./bigdata.txt`, 'utf8');
const myWriteStream = fs.createWriteStream(`./bigdata2.txt`);
// myReadStream.on('data',(chunk)=>{
//    myWriteStream.write(chunk); 
// });
myReadStream.pipe(myWriteStream);
