"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
const app_1 = require("firebase/app");
require('dotenv').config();
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};
exports.firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
