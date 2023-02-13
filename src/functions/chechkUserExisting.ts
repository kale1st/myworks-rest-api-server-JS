import * as admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
const applicationDefault = require("../tools/applicationDefault.json");

initializeApp({
  credential: admin.credential.cert(applicationDefault),
  databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
});

export const checkUserExisting = async (email) => {
  const user = await admin.auth().getUserByEmail(email);
  await console.log(user);
  // creates user in firebase Auth
  //   const { uid } = await admin.auth().createUser({
  //     displayName: "aziz",
  //     password: "123456",
  //     email: "azizaga@gmail.com",
  //   });

  //   // adds role to users
  //   await admin.auth().setCustomUserClaims(uid, { role: "patron,işçi,kardeş" });

  //   const decodedToken = await admin.auth().verifyIdToken(token);
  //   console.log("decodedToken", JSON.stringify(admin.auth().verifyIdToken));
};
