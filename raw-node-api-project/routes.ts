
/*
title: Routes Module
description: Handle all routes request and response 
author: shamim hasnain
Date: 17/05/26
*/

import { checkHandler } from "./handlers/routeHandlers/checkHandler.js";
import {sampleHandler} from "./handlers/routeHandlers/sampleHandler.js";
import { tokenHandler } from "./handlers/routeHandlers/tokenHandler.js";
import { userHandler, RequestProperties } from "./handlers/routeHandlers/userHandler.js";

interface Routes {
  [key: string]: (requestProperties: RequestProperties, callback: (statusCode: number | undefined, payload: object | undefined) => void) => void;
}

const routes: Routes = {
    sample: sampleHandler,
    user:userHandler,
    token:tokenHandler,
    check:checkHandler,
};

export default routes;
