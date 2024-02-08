import { getDatabase, ref, set } from "firebase/database";
import { Book } from "./Book";
import * as admin from "firebase-admin";
import { addGroupToUser } from "../functions/addGroupToUser";
import { getRoles } from "../functions/role_getAll";
import { catchError, concatMap, from, map, of, tap, toArray } from "rxjs";
import { addRole } from "../functions/role_add";

export class User {
    userName: string;
    email: string;
    password: string;
    role: number;
    books: Book[] = [];

    constructor(username: string, email: string, password: string, role: number) {
        this.userName = username
        this.email = email
        this.password = password
        this.role = role
    }

    retrieveEditorByEditorId = async (editorId: any) => {
        return await admin.auth().getUser(editorId)
            .then(async (userRecords: any) => {
                return {
                    displayName: userRecords.displayName,
                    uid: userRecords.uid
                }
            }).catch(error => {
                return { error: error.message }
            })
    }

    addRoleToUser = async (userId: any, role: string, groupId: any) => {
        await addRole(userId, groupId, role).then(result => {
            { return result }
        })
    }

    retrieveUserByEmail = async (email: any) => {
        return admin.auth().getUserByEmail(email).then(userRecord => {
            return userRecord
        }).catch(error => {
            return { error: error.message }
        })
    }

    addParticipantToGroup = async (groupId: any, email: any, role: string) => {
        const db = getDatabase();
        // checking if the user a member
        const userRecords = await admin.auth().getUserByEmail(email);
        const nodeRef = admin.database().ref(`groups/${groupId}/users/${userRecords.uid}`);
        return nodeRef.once('value', async (snapshot) => {
            //if not, the user is added as a participant
            if (!snapshot.exists()) {
                await set(ref(db, `groups/${groupId}/users/${userRecords.uid}`), {
                    email: email,
                    roles: [role]
                });
                await addGroupToUser(userRecords.uid, groupId, role);
                return {
                    response: {
                        email: email,
                        role: role
                    } + ' added to the group'
                };
            } else {
                //if the user already a member of the grup
                await addRole(userRecords.uid, groupId, role).then(res => {
                    { }
                })
            }
        }, (error) => {
            return { error: error }
        });
    }

    getUserRoles = async (uid: any) => {
        return getRoles(uid).then((roles) => {
            return roles
        }).catch((error) => {
            return { error: error.messages }
        })
    }

    //fullfilling the select tag on FormGroup to create new chapter
    retrieveAllUsersOfTheGroup = async (groupId: any): Promise<any[]> => {
        const nodeRef = admin.database().ref(`groups/${groupId}/users`);
        return new Promise<any[]>((resolve, reject) => {
            nodeRef.once('value', async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    from(Object.values(data)).pipe(
                        concatMap((data: any) => this.retrieveUserByEmail(data.email).then((userRecord: any) => {
                            return { displayName: userRecord.displayName, uid: userRecord.uid }
                        })),
                        toArray()
                    ).subscribe({
                        next: (arrInfo: any[]) => {
                            return resolve(arrInfo);
                        }
                    }
                    );

                } else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            });
        });
    }
    //to role controll on the client-side
    retrieveSingleUserRolesOfTheGroup = async (groupId: any, userId: any) => {
        const nodeRef = admin.database().ref(`groups/${groupId}/users/${userId}`);
        return new Promise<any[]>((resolve, reject) => {
            from(nodeRef.once('value', async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    return data
                } else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            })).subscribe({
                next: ((data: any) => {
                    return resolve(data.val()?.roles)
                })
            })
        });
    }
}
