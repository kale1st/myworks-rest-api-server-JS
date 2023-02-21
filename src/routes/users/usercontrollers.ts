import * as admin from "firebase-admin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Request, Response } from 'express';
import { firebaseApp } from "../../tools/firebaseTools";

const auth = getAuth(firebaseApp);
const createUser = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    await admin.auth().getUserByEmail(email).then(async (userRecord) => {
        return res.status(409).json({
            response: 'user already exists'
        });
    }).catch(async (error) => {
        // if user does not exist than new user is created========
        await admin.auth().createUser({
            displayName: email.split('@')[0],
            password: password,
            email: email,
        })
            //getting idToken to send to the client-side===============
            .then(async (userCredential) => {
                await admin.auth().setCustomUserClaims(userCredential.uid, { roles: new Array() });

                admin.auth().createCustomToken(userCredential.uid)
                    .then(async (customToken) => {
                        return await res.status(200).json({
                            token: customToken
                        });
                    })
                    .catch(async (error) => {
                        return await res.status(404).json({
                            error: error.message
                        });
                    });
            });
    })
};

export default { createUser };