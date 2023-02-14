import * as admin from "firebase-admin";
import { initializeApp } from 'firebase-admin/app';
const applicationDefault = require("../tools/applicationDefault.json");

initializeApp({
    credential: admin.credential.cert(applicationDefault),
    databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
});

export const checkRole = async (email) => {
    await admin.auth().getUserByEmail(email);

    // creates user in firebase Auth
    const { uid } = await admin.auth().createUser({
        displayName: "aziz",
        password: "123456",
        email: "azizaga@gmail.com"
    })

    // adds role to users
    await admin.auth().setCustomUserClaims(uid, { role: "patron,işçi,kardeş" })

    console.log("decodedToken", JSON.stringify(admin.auth().verifyIdToken))
}