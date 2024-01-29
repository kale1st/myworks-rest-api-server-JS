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
exports.addRole = void 0;
const admin = __importStar(require("firebase-admin"));
const database_1 = require("firebase/database");
const addRole = (userId, groupId, role) => {
    const db = (0, database_1.getDatabase)(); //to update
    const nodeRef = admin.database().ref(`users/${userId}/groups/${groupId}`);
    return nodeRef.once('value', async (snapshot) => {
        var _a, _b, _c;
        //it is checked that the new role is already added to the user'
        const roles = await ((_a = snapshot.val()) === null || _a === void 0 ? void 0 : _a.roles);
        const bool = await (roles === null || roles === void 0 ? void 0 : roles.includes(role));
        //if the role is not added at the user, than it is added to the user
        if (!bool) {
            roles === null || roles === void 0 ? void 0 : roles.push(role);
            //add role to the user in the node "group"
            await ((_c = (_b = admin.auth()) === null || _b === void 0 ? void 0 : _b.getUser(userId)) === null || _c === void 0 ? void 0 : _c.then(async (userRecords) => {
                await (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/users/${userId}`), {
                    email: userRecords.email,
                    roles: roles
                });
            }).catch((error) => {
                return { response: error.message };
            }));
            //add role to the user in the node "users"
            await (0, database_1.set)((0, database_1.ref)(db, `users/${userId}/groups/${groupId}`), {
                groupId: groupId,
                roles: roles
            });
        }
        else {
            //if user already has the role
            return { response: 'the user is already a ' + role };
        }
    });
};
exports.addRole = addRole;
