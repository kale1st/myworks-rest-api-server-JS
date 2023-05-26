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
            yield (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/users/${mentorId}`), {
                email: mentorEmail,
                role: Roles_1.Roles[2]
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
            //removes the group from users at first
            yield (0, deleteGroupFromUser_1.deleteGroupFromUsers)(groupId).then((data) => __awaiter(this, void 0, void 0, function* () {
                //then deletes group from the node 'groups'
                const ref = yield admin.database().ref('groups/');
                return yield ref.child(groupId).remove();
            }));
        });
    }
    retrieveAllGroupsOfTheUserByuserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getUsersAllGroupsAndRoles(userId).then((info) => {
                    const listGroups = info.val();
                    (0, rxjs_1.from)(Object.values(listGroups)).pipe((0, rxjs_1.concatMap)((data) => this.retrieveSingleGroupByGroupId(data.groupId)), (0, rxjs_1.map)((group) => ({
                        groupId: group.val().groupId,
                        groupName: group.val().groupName
                    })), (0, rxjs_1.toArray)()).subscribe({
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
                for (const obj of Object.values(groups)) {
                    yield this.getGroupNameByGroupId(obj['groupId']).then((name) => {
                        obj['groupName'] = name;
                    });
                }
                return yield (0, rxjs_1.from)(Object.values(groups)).pipe((0, rxjs_1.filter)((groupinfo) => groupinfo.role === Roles_1.Roles[2]), (0, rxjs_1.toArray)()).toPromise();
            }
            else {
                return [];
            }
        });
    }
    getGroupNameByGroupId(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeRef = admin.database().ref(`groups/${groupId}`);
            const snapshot = yield nodeRef.once('value');
            if (snapshot.exists()) {
                const group = snapshot.val();
                //filtering groups according mentors role
                return group.groupName;
            }
            else {
                return '';
            }
        });
    }
}
exports.Group = Group;
