"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const shb_1 = require("../../../models/shb");
const shb_class = new shb_1.SHB('', '', '', new Date, [], []);
const createShb = async (req, res) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    const { shbName, editorId, createDate } = req.body.shb;
    const newShb = {
        shbId: uuidv1(),
        shbName,
        editorId,
        createDate,
        shbInfo: [],
        shbHistory: [],
        // Add other properties as needed
    };
    try {
        await admin.auth().verifyIdToken(token);
        // Assuming that shb_class.createShb is a function that creates the SHB
        await shb_class.createShb(newShb);
        return res.status(200).send(newShb);
    }
    catch (err) {
        console.error('Error creating SHB:', err);
        return res.status(409).send({ error: err.message });
    }
};
exports.default = { createShb };
