import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import jwt from 'jsonwebtoken';
const secretkey = '../../src/tools/secretkey';

export const signIn = async (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  // Replace with your own logic for validating username and password


  // const token = jwt.sign({ email }, secretkey);
  // return token;
}
