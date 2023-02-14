import * as admin from "firebase-admin";
import { checkUserExisting } from "./checkUser";


export const createUser = async (email, password) => {
  await checkUserExisting(email)
    .then(() => {
      console.log("this user exists");
    })
    .catch(async () => {
      // if user does not, new user is created
      const { uid } = await admin.auth().createUser({
        displayName: "aziz",
        password: "123456",
        email: "azizaga@gmail.com"
      })
    });

};
