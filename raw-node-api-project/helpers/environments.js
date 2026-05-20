/*
title: Environments Module
description: Environments variables
author: shamim hasnain
Date: 18/05/26
*/
const environment = {};
environment.staging = {
    port: 3000,
    envName: "staging",
    secretKey: "secretkey",
};
environment.production = {
    port: 5000,
    envName: "production",
    secretKey: "secretkey",
};
// determine which environment should be call
const currentEnvironment = typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : "staging";
const environmentToExport = environment[currentEnvironment] || environment.staging;
export default environmentToExport;
