/*
title: project init file
description: init file to start the server and worker. 
author: shamim hasnain
Date: 09/06/26
*/

import server from "./lib/server.js";
import worker from "./lib/worker.js";
interface App{
init:()=>void;
}

const app = {} as App;

app.init = () => {
  //start server
  server.init();
  // start worker
  worker.init();
};

app.init();

export {app};