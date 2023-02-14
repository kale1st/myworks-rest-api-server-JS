import * as admin from "firebase-admin";
// import { initializeApp } from 'firebase-admin/app';
// const applicationDefault = require("../tools/applicationDefault.json");

// initializeApp({
//     credential: admin.credential.cert(applicationDefault),
//     databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
// });

export const addRole = async (email, role) => {
    const user: any = await admin.auth().getUserByEmail(email).then(async (userRecord: any) => {
        if (userRecord.customClaims.roles.includes(role)) {
            console.log('this user is already a ' + role)
        }
        else {
            // adds role to users
            const uid = userRecord.uid;
            // console.log(`User UID: ${uid}`);
            // await admin.auth().setCustomUserClaims(uid, { roles: role })
            let arr = userRecord.customClaims.roles;
            await arr.push(role);
            await admin.auth().setCustomUserClaims(uid, { roles: arr })
            // await console.log(typeof userRecord.customClaims.roles)
            // await console.log(userRecord.customClaims.roles)           
            // await console.log(arr)
            await console.log('role added')
        }
    });

    // creates user in firebase Auth
    // const { uid } = await admin.auth().createUser({
    //     displayName: "aziz",
    //     password: "123456",
    //     email: "azizaga@gmail.com"
    // })

    // adds role to users
    // await admin.auth().setCustomUserClaims(uid, { role: "patron,işçi,kardeş" })

    // console.log("decodedToken", JSON.stringify(admin.auth().verifyIdToken))
}