/*
title: worker file 
description: this file will handle worker processes.  
author: shamim hasnain
Date: 09/06/26
*/




// dependencies
import utilities from "../helpers/utilities.js";
import lib from "./data.js";
import _data from "./data.js";



// Interface for App scaffolding
interface Worker {
 
  init:()=>void;
  gatherAllChecks:()=>void;
loop:()=>void;
validateCheckData:(data:string)=>void;
}

//app object- module scaffolding
const worker = {} as Worker;

//look up the checks data
worker.gatherAllChecks=()=>{
    console.log("worker is running");
    //get all the checks
    lib.list("checks",(err:string | boolean | Error | undefined,data?:string[])=>{
        if(!err && data && data.length>0){
            data.forEach((check:string)=>{
                lib.read("checks",check,(err:string | boolean | Error | undefined,data?:string)=>{
                    if(!err && data){
                        worker.validateCheckData(utilities.parseJSON(data));
                    }
                })
            })
        }
    })
}

//validate indiviaul check data
worker.validateCheckData=(data:string)=>{
    // if(data && data.id){
    //     data.state=typeof data.state === "string" ? data.state && ["up","down"].indexOf(data.state) : ""
    // }
    // else{
    //     console.log("error: invalid check data");
    // }



}

//timer to execute the worker process one per minute
worker.loop=()=>{
    setInterval(() => {
    console.log("worker is running");
        
    }, 6000);
}





// handle request response


// start the server
worker.init=()=>{
  //execute all the checks

worker.gatherAllChecks();

  //call the lopp so that checks continue

worker.loop();

};
export default worker;