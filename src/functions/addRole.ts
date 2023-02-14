import * as admin from "firebase-admin";

export const addRole = async (email, role) => {
    const user: any = await admin.auth().getUserByEmail(email).then(async (userRecord: any) => {
        if (userRecord.customClaims.roles.includes(role)) {
            console.log('this user is already a ' + role)
        }
        else {
            // adds role to users
            const uid = userRecord.uid;
            let arr = userRecord.customClaims.roles;
            await arr.push(role);
            await admin.auth().setCustomUserClaims(uid, { roles: arr })
            await console.log('role added')
        }
    });
}