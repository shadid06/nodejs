/*
title: Handler Module
description: Handle all request and response
author: shamim hasnain
Date: 17/05/26
*/
import url from "node:url";
import { StringDecoder } from "node:string_decoder";
import routes from "../routes.js";
import { notFoundHandler } from "../handlers/routeHandlers/notFoundHandler.js";
const handler = {};
handler.handleReqRes = (req, res) => {
    //response handle
    //url parse
    const parsedUrl = url.parse(req.url || "", true);
    // console.log(parsedUrl);
    const path = parsedUrl.pathname;
    const trimmedPath = (path || "").replace(/^\/+|\/$/g, "");
    const method = req.method?.toLowerCase();
    const query = parsedUrl.query;
    const headersObject = req.headers;
    const requestProperties = {
        trimmedPath: trimmedPath,
        method: method,
        query: query,
        headersObject: headersObject,
        body: "",
    };
    const stringDecoder = new StringDecoder("utf-8");
    let readableData = "";
    const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    req.on("data", (buffer) => {
        readableData += stringDecoder.write(buffer);
    });
    req.on("end", () => {
        readableData += stringDecoder.end();
        requestProperties.body = readableData;
        choosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === "number" ? statusCode : 500;
            payload = typeof payload === "object" ? payload : {};
            const payloadString = JSON.stringify(payload);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
    // console.log(trimmedPath, method, query, headersObject);
};
export default handler;
