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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hatim_1 = require("../../models/Hatim");
const admin = __importStar(require("firebase-admin"));
const hatim = new Hatim_1.Hatim();
const createHatim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.body;
    return yield hatim.createHatim(groupId);
});
const retrieveHatim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.query.groupId;
    yield hatim.retrieveAllCuzs(groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    });
});
const updateHatim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cuz, cuznumber, groupId } = req.body;
    yield hatim.updateHatim(cuznumber, cuz, groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    });
});
const deleteHatim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('deleted');
});
const getSingleCuz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cuzname = req.query.cuzname;
    const groupId = req.query.groupId;
    console.log(cuzname + '  ' + groupId);
    yield hatim.getSingleCuz(cuzname, groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    });
});
const getReaderName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(response);
        //
    })).catch((err) => {
        return res.status(401).send(err.message);
    });
});
//to show name of another user who got cuz before
const getNameOfAnotherUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'].split(' ')[1];
    const userId = req.query.uid;
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        if (userId && userId.length <= 128) {
            yield admin.auth().getUser(userId)
                .then((userRecord) => {
                return res.send({ readername: userRecord.displayName });
            })
                .catch((error) => {
                console.error('Error fetching user record:', error);
            });
        }
        else
            res.send('no reader found');
    })).catch((err) => {
        return res.status(401).send(err.message);
    });
});
exports.default = { createHatim, retrieveHatim, getSingleCuz, deleteHatim, updateHatim, getReaderName, getNameOfAnotherUsers };
