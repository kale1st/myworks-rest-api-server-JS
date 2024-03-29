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
exports.addGroupToUser = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
const role_add_1 = require("./role_add");
const addGroupToUser = async (userId, groupId, role) => {
    const db = (0, database_1.getDatabase)();
    const nodeRef = admin.database().ref(`users/${userId}/groups/${groupId}`);
    return nodeRef.once('value', async (snapshot) => {
        //if the user is not a member of the group,the user is added to the group and the role is added to the user as the first role
        if (!snapshot.exists()) {
            const uObj = await {
                groupId: groupId,
                roles: [role]
            };
            return await (0, database_1.set)((0, database_1.ref)(db, `users/${userId}/groups/${groupId}`), uObj);
        }
        else {
            //if the user is already member of the group with any role
            await (0, role_add_1.addRole)(userId, groupId, role);
            return null;
        }
    }, (error) => {
        return { error: error };
    });
};
exports.addGroupToUser = addGroupToUser;
