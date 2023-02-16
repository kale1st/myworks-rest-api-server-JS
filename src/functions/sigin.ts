import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { firebaseApp } from "../tools/firebaseTools";
const secretkey = "../tools/secretkey"

const auth = getAuth(firebaseApp);
let token;
const signin = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            token = jwt.sign({ userCredential }, secretkey);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        });
    // =============
    if (token)
        return res.status(200).json({
            token: token
        });
    else
        return res.status(400).send({ errors: ['Invalid e-mail or password'] });

}

export default { signin };