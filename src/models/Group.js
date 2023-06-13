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
exports.Group = void 0;
const admin = __importStar(require("firebase-admin"));
const database_1 = require("firebase/database");
const Roles_1 = require("./Roles");
const addGroupToUser_1 = require("../functions/addGroupToUser");
const rxjs_1 = require("rxjs");
const Pir_1 = require("./Pir");
const deleteGroupFromUser_1 = require("../functions/deleteGroupFromUser");
const db = (0, database_1.getDatabase)();
class Group {
    constructor(groupName, mentorId) {
        this.groupName = groupName,
            this.mentorId = mentorId;
    }
    //for admin=====================
    //groups are created default with their mentors
    createGroup(groupName, mentorId, groupId, mentorEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            //add group to 'groups' node in DB
            yield (0, database_1.set)((0, database_1.ref)(db, 'groups/' + groupId), {
                groupName: groupName,
                mentorId: mentorId,
                mentorEmail: mentorEmail,
                groupId: groupId,
            });
            //this is the first user(mentor) of this grup. So, at first no need to call roles of the user in this group
            yield (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/users/${mentorId}`), {
                email: mentorEmail,
                roles: [Roles_1.Roles[2]]
            });
            //add the group to the user (here the userId is mentorId)
            (0, addGroupToUser_1.addGroupToUser)(mentorId, groupId, Roles_1.Roles[2]);
        });
    }
    retrieveGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get a reference to the desired node in the database
            const nodeRef = admin.database().ref('groups');
            // Read the data at the node once
            return nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    // access the data from the snapshot if it exists
                    const data = snapshot.val();
                    return data;
                }
                else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            });
        });
    }
    updateGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = admin.database();
            const ref = db.ref('groups/' + group.groupId);
            return ref.update(group)
                .then(() => {
                return { group };
            })
                .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error };
            });
        });
    }
    deleteGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pirInstance = new Pir_1.Pir(null, null, null, null, null, [], []);
            //at first deleted the node 'assigned' of all pir of this group on pirlist
            return new Promise((resolve, reject) => {
                const nodeRef = admin.database().ref(`groups/${groupId}/works/pirs`);
                nodeRef.once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                    //if group has pir to edit
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        return (0, rxjs_1.from)(Object.keys(data)).pipe((0, rxjs_1.concatMap)((pirId) => __awaiter(this, void 0, void 0, function* () {
                            const ref = yield admin.database().ref(`pirs/${pirId}`);
                            ref.update({ assigned: false }).then(() => __awaiter(this, void 0, void 0, function* () {
                                //removes the group from users at first
                                yield (0, deleteGroupFromUser_1.deleteGroupFromUsers)(groupId).then((data) => __awaiter(this, void 0, void 0, function* () {
                                    //then deletes group from the node 'groups'
                                    const ref = yield admin.database().ref('groups/');
                                    return yield ref.child(groupId).remove();
                                }));
                            })).catch((error) => {
                                console.error('Error updating node:', error);
                            });
                        })), (0, rxjs_1.toArray)()).subscribe({
                            next: () => {
                                return null;
                            }
                        });
                        //if group has no pir to edit
                    }
                    else {
                        //removes the group from users at first
                        yield (0, deleteGroupFromUser_1.deleteGroupFromUsers)(groupId).then((data) => __awaiter(this, void 0, void 0, function* () {
                            //then deletes group from the node 'groups'
                            const ref = yield admin.database().ref('groups/');
                            return yield ref.child(groupId).remove();
                        }));
                    }
                }), (error) => {
                    return { error: error };
                });
            });
        });
    }
    retrieveAllGroupsOfTheUserByuserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getUsersAllGroupsAndRoles(userId).then((info) => {
                    const listGroups = info.val();
                    (0, rxjs_1.from)(Object.values(listGroups)).pipe((0, rxjs_1.concatMap)((data) => this.retrieveSingleGroupByGroupId(data.groupId)), (0, rxjs_1.map)((group) => {
                        var _a, _b;
                        return ({
                            groupId: (_a = group.val()) === null || _a === void 0 ? void 0 : _a.groupId,
                            groupName: (_b = group.val()) === null || _b === void 0 ? void 0 : _b.groupName
                        });
                    }), (0, rxjs_1.toArray)()).subscribe({
                        next: (groupData) => {
                            return resolve(groupData); // Resolve the Promise with the groupData
                        }
                    });
                }).catch((error) => {
                    return reject(error); // Reject the Promise if there is an error in getUsersAllGroupsAndRoles
                });
            });
        });
    }
    retrieveSingleGroupByGroupId(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get a reference to the desired node in the database
            const nodeRef = admin.database().ref('groups/' + groupId);
            // Read the data at the node once
            return nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    // access the data from the snapshot if it exists
                    const data = snapshot.val();
                    return data;
                }
                else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            });
        });
    }
    getUsersAllGroupsAndRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // getting IDs and roles of all groups of the user
            const nodeRef = admin.database().ref(`users/${userId}/groups`);
            return nodeRef.once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                return snapshot.val();
            }), (error) => {
                return { error: error };
            });
        });
    }
    retrieveAllUsersOfTheGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get a reference to the desired node in the database
            const nodeRef = admin.database().ref('groups/' + groupId + '/users');
            // Read the data at the node once
            return nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    // access the data from the snapshot if it exists
                    const data = snapshot.val();
                    return data;
                }
                else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            });
        });
    }
    //gets groups of a mentor in which mentor is not a participant  
    retrieveAllGroupsOfTheMentor(mentorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeRef = admin.database().ref(`users/${mentorId}/groups`);
            const snapshot = yield nodeRef.once('value');
            if (snapshot.exists()) {
                const groups = snapshot.val();
                return new Promise((resolve, reject) => {
                    (0, rxjs_1.from)(Object.values(groups)).pipe(
                    // gets groups in that the user is mentor
                    (0, rxjs_1.filter)((groupsinfo) => { var _a; return (_a = groupsinfo === null || groupsinfo === void 0 ? void 0 : groupsinfo.roles) === null || _a === void 0 ? void 0 : _a.includes(Roles_1.Roles[2]); }), (0, rxjs_1.concatMap)((data) => this.retrieveSingleGroupByGroupId(data.groupId)), (0, rxjs_1.map)((group) => ({
                        //returns only groupId and its names
                        groupId: group.val().groupId,
                        groupName: group.val().groupName
                    })), (0, rxjs_1.toArray)()).subscribe({
                        next: (groups) => {
                            resolve(groups);
                        },
                        error: (error) => {
                            reject(error);
                        }
                    });
                });
            }
            else {
                return [];
            }
        });
    }
    deleteParticipantFromGroup(groupId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            //gets users id
            admin.auth().getUserByEmail(email).then((userRecords) => {
                //deletes user from the group
                const userId = userRecords.uid;
                const nodeRef = admin.database().ref(`groups/${groupId}/users`);
                return nodeRef.once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                    if (snapshot.exists()) {
                        yield nodeRef.child(userId).remove();
                        //deletes group from the user
                        const nodeRef2 = admin.database().ref(`users/${userId}/groups/`);
                        yield nodeRef2.once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                            if (snapshot.exists()) {
                                yield nodeRef2.child(groupId).remove();
                            }
                        }));
                        return yield { result: 'user deleted successfully' };
                    }
                    else
                        return yield { result: 'user cannot be deleted' };
                }));
            });
        });
    }
}
exports.Group = Group;
