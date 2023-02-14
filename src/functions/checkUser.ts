import * as admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
const applicationDefault = require("../tools/applicationDefault.json");

initializeApp({
  credential: admin.credential.cert(applicationDefault),
  databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
});

export const checkUser = async (email) => {
  const user = await admin.auth().getUserByEmail(email);
  await console.log(user)
};
