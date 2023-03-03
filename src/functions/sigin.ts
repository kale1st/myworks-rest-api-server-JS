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
                            "token": idToken,
                            'uid': user.uid,
                            'displayName': user.providerData[0].displayName
                        });
                    })
                    .catch((error) => {
                        return res.send({
                            'error': error.message,
                            'status': 404
                        });
                    });
            }
        })
        .catch((error) => {
            return res.send({ 'error': error.message, 'status': 404 });

        });
}

export default { signin };