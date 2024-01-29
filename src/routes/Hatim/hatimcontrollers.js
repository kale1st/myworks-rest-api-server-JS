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
const Hatim_1 = require("../../models/Hatim");
const admin = __importStar(require("firebase-admin"));
const hatim = new Hatim_1.Hatim();
const createHatim = async (req, res) => {
    const { groupId } = req.body;
    return await hatim.createHatim(groupId);
};
const retrieveHatim = async (req, res) => {
    const groupId = req.query.groupId;
    await hatim.retrieveAllCuzs(groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    });
};
const updateHatim = async (req, res) => {
    const { cuz, cuznumber, groupId } = req.body;
    await hatim.updateHatim(cuznumber, cuz, groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    });
};
const deleteHatim = async (req, res) => {
    console.log('deleted');
};
const getSingleCuz = async (req, res) => {
    const cuzname = req.query.cuzname;
    const groupId = req.query.groupId;
    console.log(cuzname + '  ' + groupId);
    await hatim.getSingleCuz(cuzname, groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    });
};
const getReaderName = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }
        const response = await admin.auth().verifyIdToken(token);
        return res.status(200).send({ readerName: response.displayName, uid: response.uid });
    }
    catch (err) {
        console.error("Error getting reader name:", err);
        return res.status(401).send({ error: err.message });
    }
};
//to show name of another user who got cuz before
const getNameOfAnotherUsers = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const userId = req.query.uid;
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }
        if (userId && userId.length <= 128) {
            const response = await admin.auth().verifyIdToken(token);
            const userRecord = await admin.auth().getUser(userId);
            return res.status(200).send({ readername: userRecord.displayName });
        }
        else {
            return res.send('No reader found');
        }
    }
    catch (err) {
        console.error('Error fetching user record:', err);
        return res.status(401).send({ error: err.message });
    }
};
exports.default = { createHatim, retrieveHatim, getSingleCuz, deleteHatim, updateHatim, getReaderName, getNameOfAnotherUsers };
