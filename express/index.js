import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// app.set('view engine','ejs');
// // app.use(express.json());
// app.use(express.static(`${__dirname}/public`,{
//     index:"text/home.html"
// }));
// app.use(express.json());
// app.use(cookieParser());
// const adminRouter=express.Router();
// adminRouter.get('/dashboard',(req,res)=>{
//     console.log('baseUrl',req.baseUrl);
//     console.log('originalUrl',req.originalUrl);
//     console.log('hostname',req.hostname);
//     console.log('path',req.path);
//     console.log('method',req.method);
//     console.log('protocol',req.protocol);
//     console.log('ip',req.ip);
//     console.log('ips',req.ips);
//     console.log('route',req.route);
//     console.log('route.path',req.route.path);
//     console.log('route.stack',req.route.stack);
//     console.log('params',req.params);
//     console.log('query',req.query);
//     console.log('cookies',req.cookies);
//     console.log('headers',req.headers);
//     console.log('url',req.url);
//     console.log('signedCookies',req.signedCookies);
//     console.log('xhr',req.xhr);
//     console.log('secure',req.secure);
//     console.log('stale',req.stale);
//     console.log('fresh',req.fresh);
//     console.log('subdomains',req.subdomains);
//     res.send("Dashboard");
// });
// app.use('/admin',adminRouter);
// app.get("/user/:id", (req, res) => {
//     console.log('baseUrl',req.baseUrl);
//     console.log('originalUrl',req.originalUrl);
//     console.log('hostname',req.hostname);
//     console.log('path',req.path);
//     console.log('method',req.method);
//     console.log('protocol',req.protocol);
//     console.log('ip',req.ip);
//     console.log('ips',req.ips);
//     console.log('route',req.route);
//     console.log('route.path',req.route.path);
//     console.log('route.stack',req.route.stack);
//     console.log('params',req.params);
//     console.log('query',req.query);
//     console.log('cookies',req.cookies);
//     console.log('headers',req.headers);
//     console.log('url',req.url);
//     console.log('signedCookies',req.signedCookies);
//     console.log('xhr',req.xhr);
//     console.log('secure',req.secure);
//     console.log('stale',req.stale);
//     console.log('fresh',req.fresh);
//     console.log('subdomains',req.subdomains);
//     res.send("Hello World!");
// });
// app.post("/", (req, res) => {
//     console.log(req.body);
//     res.send("post request received");
// });
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.get("/about", (req, res) => {
    //    res.send("about");   
    console.log(res.headersSent);
    res.render("pages/about.ejs", {
        name: "Bangladesh"
    });
    console.log(res.headersSent);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
