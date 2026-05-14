//Built in modules: https://www.w3schools.com/nodejs/ref_modules.asp
//youtube: https://www.youtube.com/watch?v=6Yv3YXgPBJU
// import path from 'node:path';
// import os from 'node:os';
// import fs from 'node:fs';
import School from './school.js';
// import EventEmitter from 'node:events';
// const emitter=new EventEmitter();
//register a listener for bellRing event
//raise an event
const school = new School();
school.on('bellRinged', ({ time, text }) => {
    console.log(`school is closed at ${time} and ${text}`);
});
school.startSchool();
// emitter.emit('bellRinged');
//listener
// const mypath = "E:/nodejs/Server & Core Modules/index.ts";
// console.log(path.basename(mypath));
// console.log(path.extname(mypath));
// console.log(path.parse(mypath));
//os
// console.log(os.platform());
// console.log(os.homedir());
// console.log(os.cpus());
//file
// fs.writeFileSync("myFile.txt","hello world. ");
// // fs.writeFileSync("myFile.txt","how are you?"); //replace synchronus way
// fs.appendFileSync("myFile.txt","how are you?"); //appean synchronus way
// // const data = fs.readFileSync("myFile.txt","utf8"); //synchronus way
// const data = fs.readFile("myFile.txt",(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString());
// }); //asynchronus way
// console.log(data);
//async way is highly recommended
// fs.renameSync("myFile.txt","myNewFile.txt");
// fs.unlinkSync("myNewFile.txt");
