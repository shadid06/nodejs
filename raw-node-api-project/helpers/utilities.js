/*
title: Utilities Module
description: Utilities variables
author: shamim hasnain
Date: 18/05/26
*/
import crypto from "crypto";
import environment from "./environments.js";
const utilities = {};
//parse json to object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
utilities.parseJSON = (jsonString) => {
    try {
        const parsedJSON = JSON.parse(jsonString);
        return parsedJSON;
    }
    catch (error) {
        console.error("Error parsing JSON string:", error);
        return {};
    }
};
//hash string
utilities.hash = (str) => {
    const hash = crypto.createHmac("sha256", environment.secretKey);
    hash.update(str);
    return hash.digest("hex");
};
//create random string
utilities.createRandomString = (strLength) => {
    let length = strLength;
    length = typeof length === "number" && length > 0 ? length : 0;
    if (length) {
        //  generate
        const possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let output = "";
        for (let i = 0; i < length; i++) {
            const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            output += randomCharacter;
        }
        return output;
    }
    else {
        return false;
    }
};
export default utilities;
