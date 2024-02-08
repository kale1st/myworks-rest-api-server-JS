import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";

export const addRole = (userId: any, groupId: any, role: string) => {
    const db = getDatabase();//to update
    const nodeRef = admin.database().ref(`users/${userId}/groups/${groupId}`);
    return nodeRef.once('value', async (snapshot) => {
        //it is checked that the new role is already added to the user'
        const roles = await snapshot.val()?.roles;
        const bool = await roles?.includes(role);
        //if the role is not added at the user, than it is added to the user

        if (!bool) {
            roles?.push(role)
            //add role to the user in the node "group"
            await admin.auth()?.getUser(userId)?.then(async (userRecords) => {
                await set(ref(db, `groups/${groupId}/users/${userId}`), {
                    email: userRecords.email,
                    roles: roles
                });
            }).catch((error) => {
                return { response: error.message }
            })

            //add role to the user in the node "users"
            await set(ref(db, `users/${userId}/groups/${groupId}`), {
                groupId: groupId,
                roles: roles
            });
        } else {
            //if user already has the role
            return { response: 'the user is already a ' + role }
        }
    })
}