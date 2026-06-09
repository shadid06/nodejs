/*
title: Environments Module
description: Environments variables 
author: shamim hasnain
Date: 18/05/26
*/

import dotenv from "dotenv";
dotenv.config();

//module scaffolding
interface Environment {
    staging: {
        port: number;
        envName: string;
        secretKey: string;
        maxChecks:number;
        twilio:{
            fromPhone:string;
            accountSid:string;
            authToken:string;
        }
    };
    production: {
        port: number;
        envName: string;
        secretKey: string;
        maxChecks:number;
         twilio:{
            fromPhone:string;
            accountSid:string;
            authToken:string;
        }
    };
}
const environment = {} as Environment;

environment.staging = {
    port: 3000,
    envName: "staging",
    secretKey: "secretkey",
    maxChecks:5,
     twilio:{
            fromPhone: process.env.TWILIO_FROM_PHONE || "",
            accountSid: process.env.TWILIO_ACCOUNT_SID || "",
            authToken: process.env.TWILIO_AUTH_TOKEN || "",
        }
};

environment.production = {
    port: 5000,
    envName: "production",
    secretKey: "secretkey",
    maxChecks:5,
     twilio:{
            fromPhone: process.env.TWILIO_FROM_PHONE || "",
            accountSid: process.env.TWILIO_ACCOUNT_SID || "",
            authToken: process.env.TWILIO_AUTH_TOKEN || "",
        }
};

// determine which environment should be call

const currentEnvironment = typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : "staging";

const environmentToExport = environment[currentEnvironment as keyof Environment] || environment.staging;

export default environmentToExport;