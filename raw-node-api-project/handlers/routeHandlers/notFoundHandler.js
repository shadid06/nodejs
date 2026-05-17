/*
title: Sample Handler Module
description: Sample handler for testing
author: shamim hasnain
Date: 17/05/26
*/
export const notFoundHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, { "message": "this is not found handler" });
};
const handler = {};
handler.notFoundHandler = notFoundHandler;
export default handler;
