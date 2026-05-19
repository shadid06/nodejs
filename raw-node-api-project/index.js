/*
title: Uptime Monitoring Api
description: make a api that check the uptime of given url.
author: shamim hasnain
Date: 17/05/26
*/
import http from "node:http";
import handler from "./helpers/handleReqRes.js";
import environmentToExport from "./helpers/environments.js";
//app object- module scaffolding
const app = {};
//configuration
// app.config = {
//   port: 3000,
// };
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
app.handlesReqRes = handler.handleReqRes;
// start the server
app.createServer();
