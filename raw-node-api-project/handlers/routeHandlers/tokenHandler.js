/* eslint-disable @typescript-eslint/no-explicit-any */
/*
title: Token Handler Module
description: Token handler for testing
author: shamim hasnain
Date: 1/06/26
*/
import data from "../../lib/data.js";
import utilities from "../../helpers/utilities.js";
export const tokenHandler = (requestProperties, callback) => {
    const acceptedmethods = ["get", "post", "put", "delete"];
    // check method
    if (acceptedmethods.indexOf(requestProperties.method) > -1) {
        switch (requestProperties.method) {
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
    }
    else {
        callback(405, { "message": "method not allowed" });
    }
};
const getMethod = (requestProperties, callback) => {
    //get token
    const id = typeof requestProperties.query.id === "string" && requestProperties.query.id.trim().length === 20 ? requestProperties.query.id.trim() : "";
    //callback  
    data.read("tokens", id, (err, tokenData) => {
        if (!err && tokenData) {
            const tokenObject = utilities.parseJSON(tokenData);
            if (tokenObject.expries > Date.now()) {
                callback(200, tokenObject);
            }
            else {
                callback(400, { "message": "token expired" });
            }
        }
        else {
            callback(404, { "message": "token not found" });
        }
    });
};
const postMethod = (requestProperties, callback) => {
    //create a token
    const phone = typeof requestProperties.body.phone === "string" && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone.trim() : "";
    const password = typeof requestProperties.body.password === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password.trim() : "";
    if (phone && password) {
        //callback  
        data.read("users", phone, (err, user) => {
            if (!err && user) {
                const hashedPassword = utilities.hash(password);
                if (hashedPassword === utilities.parseJSON(user).password) {
                    const tokenId = utilities.createRandomString(20);
                    const expries = Date.now() + 60 * 60 * 1000;
                    const tokenObject = {
                        phone,
                        id: tokenId,
                        expries
                    };
                    data.create("tokens", tokenId, tokenObject, (err) => {
                        if (!err) {
                            callback(200, tokenObject);
                        }
                        else {
                            callback(500, { "message": "There is a problem at server side" });
                        }
                    });
                }
                else {
                    callback(400, { "message": "invalid password or phone number" });
                }
            }
            else {
                callback(404, { "message": "user not found" });
            }
        });
    }
    else {
        callback(400, { "message": "you provided invalid or missing field" });
    }
};
const putMethod = (requestProperties, callback) => {
    //update the token
    const id = typeof requestProperties.body.id === "string" && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id.trim() : "";
    const extend = typeof requestProperties.body.extend === "boolean" && requestProperties.body.extend === true ? true : false;
    if (id && extend) {
        data.read("tokens", id, (err, tokenData) => {
            if (!err && tokenData) {
                const tokenObject = utilities.parseJSON(tokenData);
                if (tokenObject.expries > Date.now()) {
                    tokenObject.expries += 60 * 60 * 1000;
                    //store updated token
                    data.update("tokens", id, tokenObject, (err) => {
                        if (!err) {
                            callback(200, { "message": "token updated successfully", tokenObject });
                        }
                        else {
                            callback(500, { "message": "There is a problem at server side" });
                        }
                    });
                }
                else {
                    callback(400, { "message": "token expired" });
                }
            }
        });
    }
    else {
        callback(400, { "message": "token expired or invalid" });
    }
};
const deleteMethod = (requestProperties, callback) => {
    const id = typeof requestProperties.query.id === "string" && requestProperties.query.id.trim().length === 20 ? requestProperties.query.id.trim() : "";
    if (id) {
        data.read("tokens", id, (err, tokenData) => {
            if (!err && tokenData) {
                data.delete("tokens", id, (err) => {
                    if (!err) {
                        callback(200, { "message": "token deleted successfully" });
                    }
                    else {
                        callback(500, { "message": "could not delete token" });
                    }
                });
            }
            else {
                callback(404, { "message": "token not found" });
            }
        });
    }
    else {
        callback(400, { "message": "you provided invalid or missing field" });
    }
};
export const verifyToken = (id, phone, callback) => {
    data.read("tokens", id, (err, tokenData) => {
        if (!err && tokenData) {
            const tokenObject = utilities.parseJSON(tokenData);
            // সমাধান: Date.now() ফাংশন কল ফিক্স করা হলো। 
            // নোট: আপনার ডেটাবেজে যদি 'expires' বানান থাকে তবে 'expries' পরিবর্তন করে 'expires' লিখবেন।
            if (tokenObject.phone === phone && tokenObject.expries > Date.now()) {
                callback(true);
            }
            else {
                callback(false);
            }
        }
        else {
            callback(false);
        }
    });
};
