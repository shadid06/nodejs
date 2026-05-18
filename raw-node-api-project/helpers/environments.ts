/*
title: Environments Module
description: Environments variables 
author: shamim hasnain
Date: 18/05/26
*/


//module scaffolding
interface Environment {
    staging: {
        port: number;
        envName: string;
    };
    production: {
        port: number;
        envName: string;
    };
}
const environment = {} as Environment;

environment.staging = {
    port: 3000,
    envName: "staging",
};

environment.production = {
    port: 5000,
    envName: "production",
};

// determine which environment should be call

const currentEnvironment = typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : "staging";

const environmentToExport = environment[currentEnvironment as keyof Environment] || environment.staging;

export default environmentToExport;