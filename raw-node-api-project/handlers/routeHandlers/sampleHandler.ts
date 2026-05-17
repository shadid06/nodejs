/*
title: Sample Handler Module
description: Sample handler for testing
author: shamim hasnain
Date: 17/05/26
*/



export const sampleHandler = (requestProperties: object, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
   console.log(requestProperties)
    callback(200, {"message": "this is smaple url"});
};

interface SampleHandler {
    sampleHandler: (requestProperties: object, callback: (statusCode: number | undefined, payload: object | undefined) => void) => void;
}

const handler = {} as SampleHandler;
handler.sampleHandler = sampleHandler;

export default handler;