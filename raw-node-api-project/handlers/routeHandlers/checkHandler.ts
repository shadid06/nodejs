/*
title: Check Handler Module
description: handle user define checks
author: shamim hasnain
Date: 07/06/26
*/

import data from "../../lib/data.js"
import utilities from "../../helpers/utilities.js"
import { verifyToken } from "./tokenHandler.js";
import environmentToExport from "../../helpers/environments.js";

export interface RequestProperties {
    trimmedPath: string;
    method: string;
    query: Record<string, string>;
    headersObject: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
}

export const checkHandler = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
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
    
   const id=typeof requestProperties.query.id==="string" && requestProperties.query.id.trim().length>0 ? requestProperties.query.id.trim() : "";
   
   if(id){
    // look up the check 
    data.read("checks",id,(err,checkData)=>{
        if(!err && checkData){
            // check token
            let token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
           //verify token
           verifyToken(token, utilities.parseJSON(checkData).userPhone, (isValid) => {
            if(isValid){
                callback(200, utilities.parseJSON(checkData));
            }
            else{
                callback(403, {"message": "authentication error"});
            }
           });          
        }
        else{
            callback(500, {"message": "there is a problem at server side"});
        }
    })
   }else{
     callback(400, {"message": "you have a problem in your request"});
   }
}


const postMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
    //validate inputs
    let protocol =typeof requestProperties.body.protocol === "string" && ["http","https"].includes(requestProperties.body.protocol.trim()) ? requestProperties.body.protocol.trim() : "";
    let url = typeof requestProperties.body.url === "string" && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url.trim() : "";
    let method = typeof requestProperties.body.method === "string" && ["GET","POST","PUT","DELETE"].includes(requestProperties.body.method.trim()) ? requestProperties.body.method.trim() : "";
    let successCodes = typeof requestProperties.body.successCodes === "object" && requestProperties.body.successCodes.length > 0 ? requestProperties.body.successCodes : [];
    let timeoutSeconds = typeof requestProperties.body.timeoutSeconds === "number" && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : 5;

    if(protocol && url && method && successCodes && timeoutSeconds){
        // callback(200, {"message": "check created successfully"});
        let token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
            //look up the user phone by reading the token
           data.read("tokens", token, (err, tokenData) => {
            if(!err && tokenData){
                const userPhone = utilities.parseJSON(tokenData).phone;
                //look up the user data
                data.read("users", userPhone, (err2, userData) => {
                    if(!err2 && userData){
                        verifyToken(token, userPhone, (isValid) => {
                            if(isValid){
                                let userobject=utilities.parseJSON(userData);
                                let userChecks=typeof userobject.checks === "object" && userobject.checks instanceof Array ? userobject.checks : [];
                                // 
                                if(userChecks.length < environmentToExport.maxChecks){
                                  // create a random id
                                  let checkId = utilities.createRandomString(20);
                                  if (typeof checkId === "string") {
                                      // create a check object
                                      let checkObject = {
                                          id: checkId,
                                          userPhone: userPhone,
                                          protocol: protocol,
                                          url: url,
                                          method: method,
                                          successCodes: successCodes,
                                          timeoutSeconds: timeoutSeconds
                                      };
                                      data.create("checks", checkId, checkObject, (err) => {
                                          if (!err) {
                                              //add check id to user object
                                              userobject.checks = [...userChecks, checkId];
                                              data.update("users", userPhone, userobject, (err2) => {
                                                  if (!err2) {
                                                      callback(200, checkObject);
                                                  }
                                                  else {
                                                      callback(500, { "message": "There is a problem at server side" });
                                                  }
                                              });
                                          }
                                          else {
                                              callback(500, { "message": "There is a problem at server side" });
                                          }
                                      });
                                  }
                                  else {
                                      callback(500, { "message": "There is a problem at server side" });
                                  }
                                }
                                else{
                                  callback(403, {"message": `you can only create ${environmentToExport.maxChecks} checks`});
                                }
                            }
                            else{
                                callback(403, {"message": "authentication error"});
                            }
                        });
                    }
                    else{
                        callback(404, {"message": "user not found"});
                    }
                }); 
            }
            else{
                callback(403, {"message": "authentication error"});
            }
           }); 
    }
    else{
        callback(400, {"message": "you provided invalid or missing field"});
    }
}

const putMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
   //verify id
   const id=typeof requestProperties.body.id==="string" && requestProperties.body.id.trim().length>0 ? requestProperties.body.id.trim() : "";
   let protocol =typeof requestProperties.body.protocol === "string" && ["http","https"].includes(requestProperties.body.protocol.trim()) ? requestProperties.body.protocol.trim() : "";
   let url = typeof requestProperties.body.url === "string" && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url.trim() : "";
   let method = typeof requestProperties.body.method === "string" && ["GET","POST","PUT","DELETE"].includes(requestProperties.body.method.trim()) ? requestProperties.body.method.trim() : "";
   let successCodes = typeof requestProperties.body.successCodes === "object" && requestProperties.body.successCodes.length > 0 ? requestProperties.body.successCodes : [];
   let timeoutSeconds = typeof requestProperties.body.timeoutSeconds === "number" && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : 5;
   if(id){
    //look up the check
   if(protocol || url || method || successCodes || timeoutSeconds){
     data.read("checks",id,(err,checkData)=>{
      if(!err && checkData){
        let checkObject = utilities.parseJSON(checkData as string);
        //verify token
        let token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
        verifyToken(token, checkObject.userPhone, (isValid) => {
          if(isValid){
            // update check data
            if(protocol){
                checkObject.protocol=protocol;
            }
            if(url){
              checkObject.url=url;
            }
            if(method){
              checkObject.method=method;
            }
            if(successCodes){
              checkObject.successCodes=successCodes;
            }
            if(timeoutSeconds){
              checkObject.timeoutSeconds=timeoutSeconds;

            }
            data.update("checks",id,checkObject,(err2)=>{
              if(!err2){
                callback(200,checkObject);
              }
              else{
                callback(500,{"message": "there is a problem at server side"});
              }
            });
            
          }


          else{
            callback(403, {"message": "authentication error"});
          }
        });
      }
      else{
        callback(500, {"message": "there is a problem at server side"});
      }
    })
   }else{
    callback(400, {"message": "at lest provide one field"});
   }
   }else{
    callback(400, {"message": "invalid request"});
   }
}

const deleteMethod = (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void): void => {
    const id=typeof requestProperties.query.id==="string" && requestProperties.query.id.trim().length>0 ? requestProperties.query.id.trim() : "";
   
   if(id){
    // look up the check 
    data.read("checks",id,(err,checkData)=>{
        if(!err && checkData){
            // check token
            const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
           //verify token
           verifyToken(token, utilities.parseJSON(checkData).userPhone, (isValid) => {
            if(isValid){
              data.read('users',utilities.parseJSON(checkData).userPhone,(err,user)=>{
                if(!err && user){
                    const userObject = utilities.parseJSON(user);
                    const userChecks = userObject.checks.filter((check: string) => check !== id);
                    userObject.checks = userChecks;
                    data.update('users',utilities.parseJSON(checkData).userPhone,userObject,(err1)=>{
                        if(!err1){
                            data.delete('checks',id,(err2)=>{
                                if(!err2){
                                    callback(200, {"message": "check deleted successfully"});
                                }
                                else{
                                    callback(500, {"message": "there is a problem at server side"});
                                }
                            });
                        }
                        else{
                          callback(500, {"message": "there is a problem at server side"});
                        }
                    })
                }
                else{
                  callback(500, {"message": "there is a problem at server side"});
                }
              })
            }
            else{
                callback(403, {"message": "authentication error"});
            }
           });          
        }
        else{
            callback(500, {"message": "there is a problem at server side"});
        }
    })
   }else{
     callback(400, {"message": "you have a problem in your request"});
   }
}
