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
const admin = __importStar(require("firebase-admin"));
const auth_1 = require("firebase/auth");
const auth = (0, auth_1.getAuth)();
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        if (response)
            admin.auth().getUserByEmail(response.email).then((user) => {
                return res.status(200).send(user);
            });
        else
            return res.status(404).send('user not found');
    }));
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateObject } = req.body;
    admin.auth().getUserByEmail(updateObject.email)
        .then((userRecord) => {
        // Update the user's profile information
        return admin.auth().updateUser(userRecord.uid, updateObject).then((response) => {
            return res.status(200).send(response);
        });
    })
        .then((error) => {
        return res.status(404).send(error);
    })
        .catch((error) => {
        console.error('Error updating user profile:', error);
    });
});
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = req.body;
    const user = auth.currentUser;
    (0, auth_1.updatePassword)(user, newPassword).then(() => {
        // Update successful.
        return res.status(200).send('Password is updated');
    }).catch((error) => {
        return res.status(401).send("Password couldn't be updated");
    });
});
exports.default = { getUserInfo, updateUser, updateUserPassword };
