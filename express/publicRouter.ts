import express from "express";

const publicRouter=express.Router();

const log=(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.log('request url',req.originalUrl);
    next();
}

publicRouter.all('*',log);
// publicRouter.param('user',(req,res,next,id)=>{
//   req.user =id ==='1'?"Arafat":"Akash";
//     next();
// })

// publicRouter.get("/:user",(req,res,next)=>{
//     console.log("This also matches");
// next();    
// });
publicRouter.param('user', (req: express.Request, res: express.Response, next: express.NextFunction, val: string) => {
    if(val === '12') {
        next();
    } else {
        res.sendStatus(403);
    }
});

publicRouter.get("/about", (req, res) => {
   res.send("about"); 
});
publicRouter.route('/user').all((req,res,next)=>{
    console.log('this is all');
    next();
}).get((req,res)=>{
    res.send('get');
}).post((req,res)=>{
    res.send('post');
}).put((req,res)=>{
    res.send('put');
}).delete((req,res)=>{
    res.send('delete');
});

export default publicRouter;