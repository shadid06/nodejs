/*
title: Sample Handler Module
description: Sample handler for testing
author: shamim hasnain
Date: 17/05/26
*/
export const sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, { "message": "this is smaple url" });
};
const handler = {};
handler.sampleHandler = sampleHandler;
export default handler;
