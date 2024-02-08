import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const deleteGroupFromUsers = async (groupId: any) => {

    const usersOfTheGroup = await admin.database().ref(`groups/${groupId}/users`)
    return usersOfTheGroup.once('value', async (snapshot) => {
        if (snapshot.exists()) {
            // access all users of the group
            const data = snapshot.val();

            //getting user's IDs 
            const arrUsersId = Object.keys(data)

            //removes the group from all users of the froup the node '`users/${userId}/groups/${groupId}`'
            await arrUsersId.map(async (userId: any) => {
                const nodeRef = await admin.database().ref(`users/${userId}/groups/`)
                return await nodeRef.child(groupId).remove();
            })

        } else {
            return null
        }
    }, (error) => {
        return { error: error }
    });
}