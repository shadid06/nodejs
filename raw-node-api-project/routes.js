/*
title: Routes Module
description: Handle all routes request and response
author: shamim hasnain
Date: 17/05/26
*/
import { sampleHandler } from "./handlers/routeHandlers/sampleHandler.js";
import { userHandler } from "./handlers/routeHandlers/userHandler.js";
const routes = {
    sample: sampleHandler,
    user: userHandler,
};
export default routes;
