import * as admin from "firebase-admin";
import { Request, Response } from 'express';

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
                userCredential['user'].getIdToken()
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
            });
    })
};

export default { createUser };