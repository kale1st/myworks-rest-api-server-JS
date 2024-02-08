import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { User } from "./User";
import { Roles } from "./Roles";
import { addGroupToUser } from "../functions/addGroupToUser";
import { concatMap, filter, from, map, tap, toArray } from "rxjs";
import { cuz } from "./cuz";
import { Pir } from './Pir'
import { deleteGroupFromUsers } from "../functions/deleteGroupFromUser";

const db = getDatabase();


export class Group {
    mentorId: any;
    users: User[] = []
    groupName: any;
    groupId: any;
    public works: { hatim: cuz[]; pirs: any[] } = { hatim: [], pirs: [] }


    constructor(groupName: any, mentorId: any) {
        this.groupName = groupName,
            this.mentorId = mentorId
    }

    //for admin=====================
    //groups are created default with their mentors
    async createGroup(groupName: any, mentorId: any, groupId: any, mentorEmail: any) {
        //add group to 'groups' node in DB
        await set(ref(db, 'groups/' + groupId), {
            groupName: groupName,
            mentorId: mentorId,
            mentorEmail: mentorEmail,
            groupId: groupId,
        });
        //this is the first user(mentor) of this grup. So, at first no need to call roles of the user in this group
        await set(ref(db, `groups/${groupId}/users/${mentorId}`), {
            email: mentorEmail,
            roles: [Roles[2]]
        })
        //add the group to the user (here the userId is mentorId)
        addGroupToUser(mentorId, groupId, Roles[2])

    }

    async retrieveGroups() {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('groups');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async updateGroup(group: Group) {
        const db = admin.database();
        const ref = db.ref('groups/' + group.groupId);
        return ref.update(group)
            .then(() => {
                return { group }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async deleteGroup(groupId: any): Promise<any[]> {
        const pirInstance = new Pir(null, null, null, null, '', [], [], '')

        //at first deleted the node 'assigned' of all pir of this group on pirlist
        return new Promise<any[]>((resolve, reject) => {
            const nodeRef = admin.database().ref(`groups/${groupId}/works/pirs`);
            nodeRef.once('value', async (snapshot) => {
                //if group has pir to edit
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return from(Object.keys(data)).pipe(

                        concatMap(async (pirId: any) => {
                            const ref = await admin.database().ref(`pirs/${pirId}`);
                            ref.update({ assigned: false }).then(async () => {
                                //removes the group from users at first
                                await deleteGroupFromUsers(groupId).then(async (data) => {
                                    //then deletes group from the node 'groups'
                                    const ref = await admin.database().ref('groups/');
                                    return await ref.child(groupId).remove();
                                })
                            }).catch((error) => {
                                console.error('Error updating node:', error);
                            });
                        }),
                        toArray()
                    ).subscribe({
                        next: () => {
                            return null
                        }
                    })
                    //if group has no pir to edit
                } else {
                    //removes the group from users at first
                    await deleteGroupFromUsers(groupId).then(async (data) => {
                        //then deletes group from the node 'groups'
                        const ref = await admin.database().ref('groups/');
                        return await ref.child(groupId).remove();
                    })
                }

            }, (error) => {
                return { error: error }
            });
        })
    }

    async retrieveAllGroupsOfTheUserByuserId(userId: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.getUsersAllGroupsAndRoles(userId).then((info) => {
                const listGroups = info.val();
                from(Object.values(listGroups)).pipe(
                    concatMap((data: any) => this.retrieveSingleGroupByGroupId(data.groupId)),
                    map((group: Group | any) => ({
                        groupId: group.val()?.groupId,
                        groupName: group.val()?.groupName
                    })),
                    toArray()
                ).subscribe({
                    next: (groupData: any[]) => {
                        return resolve(groupData); // Resolve the Promise with the groupData
                    }
                });
            }).catch((error) => {
                return reject(error); // Reject the Promise if there is an error in getUsersAllGroupsAndRoles
            });
        });
    }

    async retrieveSingleGroupByGroupId(groupId: any) {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('groups/' + groupId);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async getUsersAllGroupsAndRoles(userId: any) {
        // getting IDs and roles of all groups of the user
        const nodeRef = admin.database().ref(`users/${userId}/groups`);
        return nodeRef.once('value', async (snapshot) => {
            return snapshot.val()
        }, (error) => {
            return { error: error }
        });
    }

    async retrieveAllUsersOfTheGroup(groupId: any) {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('groups/' + groupId + '/users');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    //gets groups of a mentor in which mentor is not a participant  
    async retrieveAllGroupsOfTheMentor(mentorId: any): Promise<any[]> {
        const nodeRef = admin.database().ref(`users/${mentorId}/groups`);
        const snapshot = await nodeRef.once('value');

        if (snapshot.exists()) {
            const groups = snapshot.val();
            return new Promise<any[]>((resolve, reject) => {
                from(Object.values(groups)).pipe(
                    // gets groups in that the user is mentor
                    filter((groupsinfo: any) => groupsinfo?.roles?.includes(Roles[2])),
                    concatMap((data: any) => this.retrieveSingleGroupByGroupId(data.groupId)),
                    map((group: Group | any) => ({
                        //returns only groupId and its names
                        groupId: group.val().groupId,
                        groupName: group.val().groupName
                    })),
                    toArray()
                ).subscribe({
                    next: (groups: any[]) => {
                        resolve(groups);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            });
        } else {
            return [];
        }
    }

    async deleteParticipantFromGroup(groupId: any, email: any) {
        //gets users id
        admin.auth().getUserByEmail(email).then((userRecords) => {
            //deletes user from the group
            const userId = userRecords.uid;
            const nodeRef = admin.database().ref(`groups/${groupId}/users`);
            return nodeRef.once('value', async (snapshot) => {
                if (snapshot.exists()) {
                    await nodeRef.child(userId).remove();

                    //deletes group from the user
                    const nodeRef2 = admin.database().ref(`users/${userId}/groups/`);
                    await nodeRef2.once('value', async (snapshot) => {
                        if (snapshot.exists()) {
                            await nodeRef2.child(groupId).remove();
                        }
                    })
                    return await { result: 'user deleted successfully' }
                }
                else
                    return await { result: 'user cannot be deleted' }
            })
        })


    }
}