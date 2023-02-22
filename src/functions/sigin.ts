import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response } from 'express';
import { firebaseApp } from "../tools/firebaseTools";

const auth = getAuth(firebaseApp);
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
                        return res.send({
                            "status": 200,
                            "message": "Success",
                            "token": idToken

                        });
                    })
                    .catch((error) => {
                        return res.send({
                            'errors': [error.message],
                            'status': 404
                        });
                    });
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return res.send({ errors: ['Invalid e-mail or password'] });

        });
}

export default { signin };