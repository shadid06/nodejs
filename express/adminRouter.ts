import express from "express";

const adminRouter=express.Router();



adminRouter.get("/dashboard",(req,res)=>{
    res.send("dashboard");
});
adminRouter.get("/user",(req,res)=>{
    res.send("users");
});

export default adminRouter;
