import * as admin from "firebase-admin";
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    await admin.auth().getUserByEmail(email).then(async (userRecord) => {
        if (userRecord) {
            return await res.send({
                'status': 409,
                response: 'user already exists'
            });
        }

    }).catch(async (error) => {
        // if user does not exist than new user is created========
        await admin.auth().createUser({
            displayName: email.split('@')[0],
            password: password,
            email: email,
        })
            .then(async (userCredential) => {
                //adding role in firebase-auth within customclaims
                await admin.auth().setCustomUserClaims(userCredential.uid, { roles: new Array() });
                //getting idToken to send to the client-side===============
                admin.auth().createCustomToken(userCredential.uid)
                    .then(async (customToken) => {
                        return res.send({
                            "status": 200,
                            "message": "Success",
                            "token": customToken

                        });
                    })
                    .catch(async (error) => {
                        return await res.status(401).send({
                            "status": 404,
                            "message": error.message,
                        });
                    });
            });
    })
};

const getUserById = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const userId: string | any = req.query.uid
    await admin.auth().verifyIdToken(token).then(async (response) => {
        admin.auth().getUser(userId)
            .then((userRecord) => {
                return res.status(200).send(userRecord)
            })
    }).catch((err) => {
        return res.status(401).send(err.message);
    })

}

export default { createUser, getUserById };