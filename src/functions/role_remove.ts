import * as admin from "firebase-admin";

export const removeRole = async (email: any, role: any) => {
    await admin.auth().getUserByEmail(email).then(async (userRecord: any) => {
        if (userRecord.customClaims.roles.includes(role)) {
            // deletes role to users
            const uid = userRecord.uid;
            const arr = userRecord.customClaims.roles;
            const newArr = arr.filter((role_: any) => role_ !== role);
            await admin.auth().setCustomUserClaims(uid, { roles: newArr })
            await console.log(role + ' is removed from users roles')
        }
        else {
            console.log('this user is already not a ' + role)
        }
    });
}