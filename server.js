"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));

const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const checkUser_1 = require("./src/functions/checkUser");
const userroutes_1 = __importDefault(require("./src/routes/users/userroutes"));
const bookroutes_1 = __importDefault(require("./src/routes/works/Book/bookroutes"));
// const hatimroutes_1 = __importDefault(require("./src/routes/hatim/hatimroutes"));
const settingsroutes_1 = __importDefault(require("./src/routes/settings/settingsroutes"));
const shbRoutes_1 = __importDefault(require("./src/routes/works/Shb/shbRoutes"));
const pirroutes_1 = __importDefault(require("./src/routes/works/pir/pirroutes"));
const generalroutes_1 = __importDefault(require("./src/routes/general/generalroutes"));
const grouproutes_1 = __importDefault(require("./src/routes/group/grouproutes"));
const pirroutes_2 = __importDefault(require("./src/routes/displays/pir/pirroutes"));
const role_remove_1 = require("./src/functions/role_remove");
const port = process.env.PORT || 3000;
require('dotenv').config();
const corsOptions = {
    origin: [
        "https://mywebsite-3f527.firebaseapp.com",
        "http://localhost:4200",
        "https://mywebsite-3f527.web.app",
        "http://192.168.0.17:4200",
        "192.168.178.111:4200",
        "http://anliyorum.web.app",
        "http://anliyorum.firebaseapp.com"
    ],
    default: "http://localhost:4200",
    optionsSuccessStatus: 200
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
// app.use('/', hatimroutes_1.default);
app.use('/', settingsroutes_1.default);
app.use('/', shbRoutes_1.default);
app.use('/', pirroutes_1.default);
app.use('/', generalroutes_1.default);
app.use('/', pirroutes_2.default);
app.use('/', grouproutes_1.default);

app.get("/checkuser", (req, res) => {
    (0, checkUser_1.checkUser)("azizkale@hotmail.com");
});
app.get("/removerole", (req, res) => {
    const { email, role } = req.query;
    (0, role_remove_1.removeRole)(email, role);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;