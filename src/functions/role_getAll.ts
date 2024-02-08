import * as admin from "firebase-admin";

export const getRoles = async (uid: any) => {
    return await admin.auth().getUser(uid).then(async (userRecord: any) => {
        return userRecord.customClaims.roles;
    });
}