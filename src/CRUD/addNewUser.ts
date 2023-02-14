import * as admin from "firebase-admin";
import { checkUser } from "../functions/checkUser";


export const createUser = async (email, password) => {
  await checkUser(email)
    .then(() => {
      console.log("this user exists");
    })
    .catch(async () => {
      // if user does not exist than new user is created
      const { uid } = await admin.auth().createUser({
        displayName: "aziz",
        password: "123456",
        email: "azizaga@gmail.com"
      })
    });
};
