/*
title: User Handler Module
description: User handler for testing
author: shamim hasnain
Date: 19/05/26
*/



export interface RequestProperties {
    trimmedPath: string;
    method: string;
    query: Record<string, string>;
    headersObject: Record<string, string>;
    body: string;
}

export const userHandler = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
 const acceptedmethods:string[] = ["get", "post", "put", "delete"];
 // check method
 if(acceptedmethods.indexOf(requestProperties.method) > -1){
   switch(requestProperties.method){
    case "get":
       getMethod(requestProperties, callback);
        break;
    case "post":
        postMethod(requestProperties, callback);
        break;
    case "put":
        putMethod(requestProperties, callback);
        break;
    case "delete":
        deleteMethod(requestProperties, callback);
        break;
   }
 }else{
    callback(405, {"message": "method not allowed"});
 }

};

const getMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
    callback(200, {"message": "this is user get method"});
}

const postMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
    callback(200, {"message": "this is user post method"});
}

const putMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
    callback(200, {"message": "this is user put url"});
}

const deleteMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
    callback(200, {"message": "this is user delete url"});
}
