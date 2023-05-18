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
exports.deleteGroupFromUsers = void 0;
const admin = __importStar(require("firebase-admin"));
const deleteGroupFromUsers = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersOfTheGroup = yield admin.database().ref(`groups/${groupId}/users`);
    return usersOfTheGroup.once('value', (snapshot) => __awaiter(void 0, void 0, void 0, function* () {
        if (snapshot.exists()) {
            // access all users of the group
            const data = snapshot.val();
            //data =>  [{ email: 'azizkale@hotmail.com', role: 'mentor' },
            //          { email: 'aziz@hotmail.com', role: 'participant' }]
            //getting userId by email
            yield data.map((data) => __awaiter(void 0, void 0, void 0, function* () {
                const userId = yield admin.auth().getUserByEmail(data.email).then((userRecord) => {
                    return userRecord.uid;
                });
                //remove group of user from the node '`users/${userId}/groups/${groupId}`'
                const nodeRef = yield admin.database().ref(`users/${userId}/groups/`);
                return yield nodeRef.child(groupId).remove();
            }));
        }
        else {
            return null;
        }
    }), (error) => {
        return { error: error };
    });
});
exports.deleteGroupFromUsers = deleteGroupFromUsers;
