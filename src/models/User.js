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
exports.User = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
const addGroupToUser_1 = require("../functions/addGroupToUser");
class User {
    constructor(username, email, password, role) {
        this.retrieveAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            // let users: any[] = []
            // return await admin.auth().listUsers()
            //     .then(async (userRecords: any) => {
            //         userRecords.users.map((userInfo) => {
            //             let user = {
            //                 displayName: userInfo.displayName,
            //                 uid: userInfo.uid
            //             }
            //             users.push(user)
            //         })
            //     })
            //     .catch((error) => {
            //         console.log('Error fetching user data:', error);
            //     });
        });
        this.retrieveEditorByEditorId = (editorId) => __awaiter(this, void 0, void 0, function* () {
            return yield admin.auth().getUser(editorId)
                .then((userRecords) => __awaiter(this, void 0, void 0, function* () {
                return {
                    displayName: userRecords.displayName,
                    uid: userRecords.uid
                };
            })).catch(error => {
                return { error: error.message };
            });
        });
        this.addRoleToUser = (userId, role) => __awaiter(this, void 0, void 0, function* () {
            yield admin.auth().getUser(userId).then((userRecord) => __awaiter(this, void 0, void 0, function* () {
                if (userRecord.customClaims.roles.includes(role)) {
                    console.log('this user is already a ' + role);
                    return { response: 'this user is already a ' + role };
                }
                else {
                    // adds role to users
                    const uid = userRecord.uid;
                    const arr = userRecord.customClaims.roles;
                    yield arr.push(role);
                    yield admin.auth().setCustomUserClaims(uid, { roles: arr });
                    return { response: arr };
                }
            }));
        });
        this.retrieveUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return admin.auth().getUserByEmail(email).then(userRecord => {
                return userRecord;
            }).catch(error => {
                return { error: error.message };
            });
        });
        this.addParticipantToGroup = (groupId, email, role) => __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDatabase)();
            const newParticipant = {
                role: role,
                email: email,
            };
            // retrieve group
            return admin.database().ref(`groups/${groupId}/users/`)
                .once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                //if there is an user-array already
                const arrParticipants = (yield snapshot.val()) || [];
                //controlling if the array has the users already
                const isIncluded = arrParticipants === null || arrParticipants === void 0 ? void 0 : arrParticipants.some((obj) => {
                    return obj.email === newParticipant.email && obj.role === newParticipant.role;
                });
                if (isIncluded) {
                    return (`${newParticipant} exists in the array `);
                }
                else {
                    yield arrParticipants.push(newParticipant);
                    //adding participant to group
                    yield (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/users/`), arrParticipants);
                    //adding group to user
                    yield admin.auth().getUserByEmail(email).then((userRecord) => {
                        (0, addGroupToUser_1.addGroupToUser)(userRecord.uid, groupId, role);
                    }).catch((error) => {
                        return { error: error.message };
                    });
                    return yield arrParticipants;
                }
            }), (error) => {
                return { error: error };
            });
        });
        this.userName = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.User = User;
