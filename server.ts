import express from 'express';
import cors from 'cors';
const app = express();
import { checkUser } from "./src/functions/checkUser";
import { addRole } from "./src/functions/addRole";
import userroutes from './src/routes/users/userroutes';
import bookroutes from './src/routes/works/Book/bookroutes';
import hatimroutes from './src/routes/Hatim/hatimroutes'

require('dotenv').config();
const corsOptions = {
  origin: [
    "https://mywebsite-3f527.firebaseapp.com",
    "http://localhost:4200",
    "https://mywebsite-3f527.web.app/",
    "http://192.168.0.17:4200"
  ],
  default: "http://localhost:4200",
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
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
app.use('/', express.static("public", options));

/** Routes */
app.use('/', userroutes);
app.use('/', bookroutes);
app.use('/', hatimroutes);
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
const port = process.env.PORT || 3000;

app.get("/checkuser", (req, res) => {
  checkUser("azizkale@hotmail.com");
});

app.get("/adduser", (req, res) => {

  // createUser("azizkale@hotmail.com", "123456");
});

app.get("/addrole", (req, res) => {
  addRole("azizkale@hotmail.com", 'admin');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
