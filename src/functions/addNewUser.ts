const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
import { firebaseApp } from "../tools/firebaseTools";
import { checkUserExisting } from "./chechkUserExisting";

const auth = getAuth(firebaseApp);

export const createUser = async (email, password) => {
  await checkUserExisting(email)
    .then(() => {
      console.log("this user exists");
    })
    .catch(() => {
      console.log("this user does not exist");
    });
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
};
