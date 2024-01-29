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
exports.checkRole = void 0;
const admin = __importStar(require("firebase-admin"));
const checkRole = async (req, res, next) => {
    try {
        const idToken = req.body.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
        if (!idToken) {
            return res.status(401).send('Unauthorized: No token provided');
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken.roles && (decodedToken.roles.includes('admin') || decodedToken.roles.includes('mentor'))) {
            next();
        }
        else {
            console.log('Unauthorized access: Insufficient role');
            return res.status(403).send('Forbidden: Insufficient role');
        }
        return decodedToken.roles;
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).send('Unauthorized: ' + error.message);
    }
};
exports.checkRole = checkRole;
exports.default = exports.checkRole;
