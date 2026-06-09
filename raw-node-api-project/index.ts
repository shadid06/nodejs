/*
title: Uptime Monitoring Api
description: make a api that check the uptime of given url. 
author: shamim hasnain
Date: 17/05/26
*/

import http from "node:http";
import handler from "./helpers/handleReqRes.js";
import environmentToExport from "./helpers/environments.js";
import { notifications } from "./helpers/notifications.js";
// import lib from "./lib/data.js";

// Test data
// lib.create("users", "shamim", {
//     name: "Shamim Hasnain",
//     email: "example@example.com",
// }, (err) => {
//     if (!err) {
//         console.log("File created successfully");
//     } else {
//         console.log(err);
//     }
// });

//read test data 
// lib.read("users", "shamim", (err, data) => {
//     if (!err && data) {
//         console.log("File read successfully");
//         console.log(data);
//     } else {
//         console.log(err);
//     }
// });

//update test data
// lib.update("users", "shamim", {
//     name: "Shamim Hasnain updated",
//     email: "sh@s.c",
// }, (err) => {
//     if (!err) {
//         console.log("File updated successfully");
//     } else {
//         console.log(err);
//     }
// });

//delete test data

// lib.delete("users", "shamim", (err) => {
//     if (!err) {
//         console.log("File deleted successfully");
//     } else {
//         console.log(err);
//     }
// });

// Interface for App scaffolding
interface App {
  config: {
    port: number;
  };
  createServer: () => void;
  handlesReqRes: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

//app object- module scaffolding
const app = {} as App;

//configuration
// app.config = {
//   port: 3000,
// };

//@TODO:remove later

notifications.sendTwilioSms("01886210133", "test message", (err) => {
  if (!err) {
    console.log("Message sent successfully");
  } else {
    console.log(err);
  }
});

//create server

app.createServer = () => {
  const server = http.createServer(app.handlesReqRes);
  server.listen(environmentToExport.port, () => {
    console.log(`Server is running on port ${environmentToExport.port}`);
  });
};



// handle request response

// app.handlesReqRes = (req: http.IncomingMessage, res: http.ServerResponse) => {
 
// };

app.handlesReqRes=handler.handleReqRes;

// start the server
app.createServer();