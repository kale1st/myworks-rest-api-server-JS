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
exports.User = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
const addGroupToUser_1 = require("../functions/addGroupToUser");
const role_getAll_1 = require("../functions/role_getAll");
const rxjs_1 = require("rxjs");
const role_add_1 = require("../functions/role_add");
class User {
    constructor(username, email, password, role) {
        this.books = [];
        this.retrieveEditorByEditorId = async (editorId) => {
            return await admin.auth().getUser(editorId)
                .then(async (userRecords) => {
                return {
                    displayName: userRecords.displayName,
                    uid: userRecords.uid
                };
            }).catch(error => {
                return { error: error.message };
            });
        };
        this.addRoleToUser = async (userId, role, groupId) => {
            await (0, role_add_1.addRole)(userId, groupId, role).then(result => {
                {
                    return result;
                }
            });
        };
        this.retrieveUserByEmail = async (email) => {
            return admin.auth().getUserByEmail(email).then(userRecord => {
                return userRecord;
            }).catch(error => {
                return { error: error.message };
            });
        };
        this.addParticipantToGroup = async (groupId, email, role) => {
            const db = (0, database_1.getDatabase)();
            // checking if the user a member
            const userRecords = await admin.auth().getUserByEmail(email);
            const nodeRef = admin.database().ref(`groups/${groupId}/users/${userRecords.uid}`);
            return nodeRef.once('value', async (snapshot) => {
                //if not, the user is added as a participant
                if (!snapshot.exists()) {
                    await (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/users/${userRecords.uid}`), {
                        email: email,
                        roles: [role]
                    });
                    await (0, addGroupToUser_1.addGroupToUser)(userRecords.uid, groupId, role);
                    return {
                        response: {
                            email: email,
                            role: role
                        } + ' added to the group'
                    };
                }
                else {
                    //if the user already a member of the grup
                    await (0, role_add_1.addRole)(userRecords.uid, groupId, role).then(res => {
                        { }
                    });
                }
            }, (error) => {
                return { error: error };
            });
        };
        this.getUserRoles = async (uid) => {
            return (0, role_getAll_1.getRoles)(uid).then((roles) => {
                return roles;
            }).catch((error) => {
                return { error: error.messages };
            });
        };
        //fullfilling the select tag on FormGroup to create new chapter
        this.retrieveAllUsersOfTheGroup = async (groupId) => {
            const nodeRef = admin.database().ref(`groups/${groupId}/users`);
            return new Promise((resolve, reject) => {
                nodeRef.once('value', async (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        (0, rxjs_1.from)(Object.values(data)).pipe((0, rxjs_1.concatMap)((data) => this.retrieveUserByEmail(data.email).then((userRecord) => {
                            return { displayName: userRecord.displayName, uid: userRecord.uid };
                        })), (0, rxjs_1.toArray)()).subscribe({
                            next: (arrInfo) => {
                                return resolve(arrInfo);
                            }
                        });
                    }
                    else {
                        return null;
                    }
                }, (error) => {
                    return { error: error };
                });
            });
        };
        //to role controll on the client-side
        this.retrieveSingleUserRolesOfTheGroup = async (groupId, userId) => {
            const nodeRef = admin.database().ref(`groups/${groupId}/users/${userId}`);
            return new Promise((resolve, reject) => {
                (0, rxjs_1.from)(nodeRef.once('value', async (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        return data;
                    }
                    else {
                        return null;
                    }
                }, (error) => {
                    return { error: error };
                })).subscribe({
                    next: ((data) => {
                        var _a;
                        return resolve((_a = data.val()) === null || _a === void 0 ? void 0 : _a.roles);
                    })
                });
            });
        };
        this.userName = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.User = User;
