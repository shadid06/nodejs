/*
title: Handler Module
description: Handle all request and response 
author: shamim hasnain
Date: 17/05/26
*/

import http from "node:http";
import url from "node:url";
import { StringDecoder } from "node:string_decoder";
import routes from "../routes.js";
import {notFoundHandler} from "../handlers/routeHandlers/notFoundHandler.js";
import utilities from "./utilities.js";


interface Handler {
  handleReqRes: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

const handler = {} as Handler;

handler.handleReqRes = (req: http.IncomingMessage, res: http.ServerResponse) => {
  //response handle

  //url parse
  const parsedUrl = url.parse(req.url || "", true);
  // console.log(parsedUrl);
  const path = parsedUrl.pathname;
  const trimmedPath = (path || "").replace(/^\/+|\/$/g, "");
  const method = req.method?.toLowerCase();
  const query = parsedUrl.query;
  const headersObject = req.headers;

  const requestProperties: {
    trimmedPath: string;
    method: string;
    query: Record<string, string>;
    headersObject: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
  } = {
    trimmedPath: trimmedPath,
    method: method as string,
    query: query as Record<string, string>,
    headersObject: headersObject as Record<string, string>,
    body: {},
  };
  const stringDecoder = new StringDecoder("utf-8");
  let readableData: string = "";
  const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

  req.on("data", (buffer: Buffer) => {
    readableData += stringDecoder.write(buffer);
  });
  // req.on("end", () => {
  //   readableData += stringDecoder.end();
  //   requestProperties.body = utilities.parseJSON(readableData);

  //   choosenHandler(requestProperties, (statusCode: number | undefined, payload: object | undefined) => {
  //     statusCode = typeof statusCode === "number" ? statusCode : 500;
  //     payload = typeof payload === "object" ? payload : {};
  //     const payloadString = JSON.stringify(payload);

  //     res.setHeader("Content-Type", "application/json");
  //     res.writeHead(statusCode);
  //     res.end(payloadString);
  //   });
  // });
    req.on("end", () => {
    readableData += stringDecoder.end();
    
    // সমাধান: readableData-তে ডেটা থাকলে তবেই পার্স হবে, নাহলে সরাসরি খালি অবজেক্ট {} বসে যাবে।
    // এর ফলে utilities.parseJSON-এ কখনো খালি স্ট্রিং যাবে না এবং কনসোলে অহেতুক এরর দেখাবে না।
    requestProperties.body = readableData.trim() ? utilities.parseJSON(readableData) : {};

    choosenHandler(requestProperties, (statusCode: number | undefined, payload: object | undefined) => {
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