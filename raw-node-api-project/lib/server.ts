/*
title: server file 
description: this file will handle request and response.  
author: shamim hasnain
Date: 09/06/26
*/

import http from "node:http";
import environmentToExport from "../helpers/environments.js";
import handler from "../helpers/handleReqRes.js";





// Interface for App scaffolding
interface Server {
  config: {
    port: number;
  };
  createServer: () => void;
  handlesReqRes: (req: http.IncomingMessage, res: http.ServerResponse) => void;
  init:()=>void;
}

//app object- module scaffolding
const server = {} as Server;

//configuration
// app.config = {
//   port: 3000,
// };


//create server

server.createServer = () => {
  const createServer = http.createServer(server.handlesReqRes);
  createServer.listen(environmentToExport.port, () => {
    console.log(`Server is running on port ${environmentToExport.port}`);
  });
};



// handle request response

// app.handlesReqRes = (req: http.IncomingMessage, res: http.ServerResponse) => {
 
// };

server.handlesReqRes=handler.handleReqRes;

// start the server
server.init=()=>{
  server.createServer();
};
export default server;