import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";
import { addRole } from "./role_add";


export const addGroupToUser = async (userId: any, groupId: any, role: string) => {
    const db = getDatabase();
    const nodeRef = admin.database().ref(`users/${userId}/groups/${groupId}`);
    return nodeRef.once('value', async (snapshot) => {
        //if the user is not a member of the group,the user is added to the group and the role is added to the user as the first role
        if (!snapshot.exists()) {
            const uObj = await {
                groupId: groupId,
                roles: [role]
            }
            return await set(ref(db, `users/${userId}/groups/${groupId}`), uObj);

        } else {
            //if the user is already member of the group with any role
            await addRole(userId, groupId, role)
            return null
        }
    }, (error) => {
        return { error: error }
    });







}