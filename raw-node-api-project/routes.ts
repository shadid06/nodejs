
/*
title: Routes Module
description: Handle all routes request and response 
author: shamim hasnain
Date: 17/05/26
*/

import {sampleHandler} from "./handlers/routeHandlers/sampleHandler.js";

interface Routes {
  [key: string]: (requestProperties: object, callback: (statusCode: number | undefined, payload: object | undefined) => void) => void;
}

const routes: Routes = {
    sample: sampleHandler
};

export default routes;
