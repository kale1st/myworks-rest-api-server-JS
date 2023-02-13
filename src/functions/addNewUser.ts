const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
import { firebaseConfig } from "../tools/firebaseTools";

import * as firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebase);

export const createUser = async (_, { email, password }, context) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
