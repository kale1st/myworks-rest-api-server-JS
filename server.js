"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const checkUser_1 = require("./src/functions/checkUser");
const addRole_1 = require("./src/functions/addRole");
const userroutes_1 = __importDefault(require("./src/routes/users/userroutes"));
const bookroutes_1 = __importDefault(require("./src/routes/works/Book/bookroutes"));
require('dotenv').config();
const corsOptions = {
    origin: ['http://localhost:4200', 'http://192.168.0.17:4200', 'https://mywebsite-3f527.firebaseapp.com/'],
    credentials: true,
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
// app.use(morgan('dev'));
/** RULES OF API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
// #########################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
let options = {
    dotfiles: "ignore",
    etag: false,
    extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
    index: ["views/signin.html"],
    maxAge: "1m",
    redirect: false,
};
app.use('/', express_1.default.static("public", options));
/** Routes */
app.use('/', userroutes_1.default);
app.use('/', bookroutes_1.default);
// #############################################################################
// Catch all handler for all other request.
app.use("*", (req, res) => {
    res
        .json({
        at: new Date().toISOString(),
        method: req.method,
        hostname: req.hostname,
        ip: req.ip,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies,
        params: req.params,
    })
        .end();
});
const port = process.env.PORT || 3000;
app.get("/checkuser", (req, res) => {
    (0, checkUser_1.checkUser)("aqqzizkale@hotmail.com");
});
app.get("/adduser", (req, res) => {
    // createUser("azizkale@hotmail.com", "123456");
});
app.get("/addrole", (req, res) => {
    (0, addRole_1.addRole)("azizkale@hotmail.com", 'admin');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
