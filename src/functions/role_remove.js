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
exports.removeRole = void 0;
const admin = __importStar(require("firebase-admin"));
const removeRole = async (email, role) => {
    await admin.auth().getUserByEmail(email).then(async (userRecord) => {
        if (userRecord.customClaims.roles.includes(role)) {
            // deletes role to users
            const uid = userRecord.uid;
            const arr = userRecord.customClaims.roles;
            const newArr = arr.filter((role_) => role_ !== role);
            await admin.auth().setCustomUserClaims(uid, { roles: newArr });
            await console.log(role + ' is removed from users roles');
        }
        else {
            console.log('this user is already not a ' + role);
        }
    });
};
exports.removeRole = removeRole;
