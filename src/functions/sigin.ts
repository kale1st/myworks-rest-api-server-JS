import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import jwt from 'jsonwebtoken';
import { firebaseApp } from "../tools/firebaseTools";
const secretkey = "../tools/secretkey"

const auth = getAuth(firebaseApp);
let token;
export const signin = async (email: any, password: any) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const token = jwt.sign({ userCredential }, secretkey);
            // console.log(userCredential)
            console.log(jwt.verify(token, secretkey))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        });
    // =============
    if (token)
        return token
    else
        "please try again"
}