/* eslint-disable @typescript-eslint/no-unused-vars */
/*
title: notifications Module
description: Important functions to notify user
author: shamim hasnain
Date: 09/06/26
*/

import https from "node:https";
import environmentToExport from "./environments.js";
import querystring from "node:querystring";

interface Notifications{
    sendTwilioSms(phone:string,msg:string,callback:(err:boolean)=>void):void;
}

const notifications = {} as Notifications;

notifications.sendTwilioSms=(phone:string,msg:string,callback:(err:boolean)=>void)=>{
    //validate inputs
    const userPhone:string=typeof(phone)==="string" ? phone : "";
    const userMsg:string=typeof(msg)==="string" && msg.trim().length>0 && msg.trim().length<=1600 ? msg : "";
    // const userCallback:function=typeof(callback)==="function" ? callback : function(){};

    if(userPhone && userMsg){
        //configure the request payload
        const payload={
            From:environmentToExport.envName==="staging" ? environmentToExport.twilio.fromPhone : environmentToExport.twilio.fromPhone,
            To:`+88${userPhone}`,
            Body:userMsg,
        };
        //stringify the payload
        const stringifiedPayload=querystring.stringify(payload);
        //configure the request
        const requestDetails={
            hostname:"api.twilio.com",
            method:"POST",
            path:`/2010-40-01/Accounts/${environmentToExport.twilio.accountSid}/Messages.json`,
            auth:`${environmentToExport.twilio.accountSid}:${environmentToExport.twilio.authToken}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Content-Length":Buffer.byteLength(stringifiedPayload),
            },
            
        };

       
      
        //handle the response
        const req=https.request(requestDetails,(res)=>{
            //grab the status of the request
            const statusCode=res.statusCode;
            
            //callback successfully if the request went through
            if(statusCode === 200 || statusCode === 201){
                callback(true);
            }else{
                callback(false);
            }

        });
         //handle the request error
          req.on("error",(err)=>{
            callback(false);
        });
        req.write(stringifiedPayload);
        req.end();

    }else{
        callback(false);
    }
}

export {notifications};

