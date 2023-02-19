"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var checkUser_1 = require("./src/functions/checkUser");
var addRole_1 = require("./src/functions/addRole");
var userroutes_1 = __importDefault(require("./src/routes/users/userroutes"));
// app.use(morgan('dev'));
/** RULES OF API */
app.use(function (req, res, next) {
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
var options = {
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
// #############################################################################
// Catch all handler for all other request.
// app.use("*", (req, res) => {
//   res
//     .json({
//       at: new Date().toISOString(),
//       method: req.method,
//       hostname: req.hostname,
//       ip: req.ip,
//       query: req.query,
//       headers: req.headers,
//       cookies: req.cookies,
//       params: req.params,
//     })
//     .end();
// });
var port = process.env.PORT || 3000;
app.get("/checkuser", function (req, res) {
    (0, checkUser_1.checkUser)("azizkale@hotmail.com");
});
app.get("/adduser", function (req, res) {
    // createUser("azizkale@hotmail.com", "123456");
});
app.get("/addrole", function (req, res) {
    (0, addRole_1.addRole)("azizkale@hotmail.com", 'admin');
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
module.exports = app;
