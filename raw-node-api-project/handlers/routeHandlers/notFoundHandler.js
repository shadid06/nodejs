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
// interface NotFoundHandler {
//     notFoundHandler: (requestProperties:object, callback: (statusCode: number | undefined, payload: object | undefined) => void) => void;
// }
// const handler = {} as NotFoundHandler;
// handler.notFoundHandler = notFoundHandler;
// export default handler;
