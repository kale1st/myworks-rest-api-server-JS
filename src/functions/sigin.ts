import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response, NextFunction } from 'express';
import { firebaseApp } from "../tools/firebaseTools";

const auth = getAuth(firebaseApp);
let token;
const signin = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            if (userCredential.user) {
                const user = await userCredential.user;
                //getting token from Fire-Auth
                await user.getIdToken()
                    .then((idToken) => {
                        // Send the ID token to the server for authentication
                        return res.status(200).json({
                            token: idToken
                        });
                    })
                    .catch((error) => {
                        console.log('Error getting ID token:', error);
                        return res.status(400).send({ errors: [error.message] });
                    });
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return res.status(404).send({ errors: ['Invalid e-mail or password'] });

        });
}

export default { signin };