/*
title: User Handler Module
description: User handler for testing
author: shamim hasnain
Date: 19/05/26
*/
import data from "../../lib/data.js";
import utilities from "../../helpers/utilities.js";
import { verifyToken } from "./tokenHandler.js";
export const userHandler = (requestProperties, callback) => {
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
    // ফোন নম্বর চেক
    const phone = typeof requestProperties.query.phone === "string" && requestProperties.query.phone.trim().length === 11 ? requestProperties.query.phone.trim() : "";
    if (phone) {
        // হেডার থেকে টোকেন নেওয়া
        const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
        if (token) {
            verifyToken(token, phone, (isValid) => {
                if (isValid) {
                    // ইউজার ডেটা রিড করা
                    data.read("users", phone, (err, user) => {
                        if (!err && user) {
                            const userObject = { ...utilities.parseJSON(user) };
                            delete userObject.password; // পাসওয়ার্ড ডিলেট
                            callback(200, userObject);
                        }
                        else {
                            callback(404, { "message": "User not found" });
                        }
                    });
                }
                else {
                    callback(403, { "message": "User authentication failed" });
                }
            });
        }
        else {
            // টোকেন না পাঠালে এই রেসপন্স যাবে (আপনার ক্ষেত্রে এখন এটিই হচ্ছে)
            callback(400, { "message": "Authentication token is missing in headers" });
        }
    }
    else {
        // ফোন নম্বর ভুল বা না থাকলে
        callback(400, { "message": "Invalid phone number or missing query" });
    }
};
const postMethod = (requestProperties, callback) => {
    // callback(200, {"message": "this is user post method"});
    const firstName = typeof requestProperties.body.firstName === "string" && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName.trim() : "";
    const lastName = typeof requestProperties.body.lastName === "string" && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName.trim() : "";
    const phone = typeof requestProperties.body.phone === "string" && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone.trim() : "";
    const password = typeof requestProperties.body.password === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password.trim() : "";
    const tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" && requestProperties.body.tosAgreement === true ? true : false;
    if (firstName && lastName && phone && password && tosAgreement) {
        // callback(200, {"message": "user created successfully"});
        //make sure that user does not exist
        data.read("users", phone, (err, user) => {
            if (!err && user) {
                callback(400, { "message": "user already exist" });
            }
            else {
                //hash password
                const hashedPassword = utilities.hash(password);
                //user object
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hashedPassword,
                    tosAgreement
                };
                //create user
                data.create("users", phone, userObject, (err) => {
                    if (!err) {
                        callback(200, { "message": "user created successfully" });
                    }
                    else {
                        callback(500, { "message": "could not create user" });
                    }
                });
            }
        });
    }
    else {
        callback(400, { "message": "you provided invalid or missing field" });
    }
};
const putMethod = (requestProperties, callback) => {
    const phone = typeof requestProperties.query.phone === "string" && requestProperties.query.phone.trim().length === 11 ? requestProperties.query.phone.trim() : "";
    const firstName = typeof requestProperties.body.firstName === "string" && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName.trim() : "";
    const lastName = typeof requestProperties.body.lastName === "string" && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName.trim() : "";
    const password = typeof requestProperties.body.password === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password.trim() : "";
    const tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" ? requestProperties.body.tosAgreement : null;
    if (phone) {
        // data.read()
        if (firstName || lastName || password || tosAgreement !== null) {
            //verify token
            const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
            if (token) {
                verifyToken(token, phone, (isValid) => {
                    if (isValid) {
                        // data.read()
                        data.read("users", phone, (err, user) => {
                            if (!err && user) {
                                //update user but can not update phone number
                                const userObject = { ...utilities.parseJSON(user) };
                                if (firstName) {
                                    userObject.firstName = firstName;
                                }
                                if (lastName) {
                                    userObject.lastName = lastName;
                                }
                                if (tosAgreement !== null) {
                                    userObject.tosAgreement = tosAgreement;
                                }
                                if (password) {
                                    userObject.password = utilities.hash(password);
                                }
                                //update user
                                data.update("users", phone, userObject, (err) => {
                                    if (!err) {
                                        const usernew = { ...userObject };
                                        delete usernew.password;
                                        callback(200, { "message": "user updated successfully", usernew });
                                    }
                                    else {
                                        callback(500, { "message": "could not update user" });
                                    }
                                });
                            }
                            else {
                                callback(404, { "message": "user not found" }); //404 is btter practice
                            }
                        });
                    }
                    else {
                        callback(403, { "message": "User authentication failed" });
                    }
                });
            }
            else {
                // টোকেন না পাঠালে এই রেসপন্স যাবে (আপনার ক্ষেত্রে এখন এটিই হচ্ছে)
                callback(400, { "message": "Authentication token is missing in headers" });
            }
        }
        else {
            callback(400, { "message": "you provided invalid or missing field" });
        }
    }
    else {
        callback(400, { "message": "you provided invalid or missing field" });
    }
};
const deleteMethod = (requestProperties, callback) => {
    //get user
    const phone = typeof requestProperties.query.phone === "string" && requestProperties.query.phone.trim().length === 11 ? requestProperties.query.phone.trim() : "";
    if (phone) {
        //verify token
        const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token.trim() : "";
        if (token) {
            verifyToken(token, phone, (isValid) => {
                if (isValid) {
                    data.read("users", phone, (err, user) => {
                        if (!err && user) {
                            data.delete("users", phone, (err) => {
                                if (!err) {
                                    callback(200, { "message": "user deleted successfully" });
                                }
                                else {
                                    callback(500, { "message": "could not delete user" });
                                }
                            });
                        }
                        else {
                            callback(404, { "message": "user not found" });
                        }
                    });
                }
                else {
                    callback(403, { "message": "User authentication failed" });
                }
            });
        }
        else {
            // টোকেন না পাঠালে এই রেসপন্স যাবে (আপনার ক্ষেত্রে এখন এটিই হচ্ছে)
            callback(400, { "message": "Authentication token is missing in headers" });
        }
    }
    else {
        callback(400, { "message": "you provided invalid or missing field" });
    }
};
