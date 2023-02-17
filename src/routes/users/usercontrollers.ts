import * as admin from "firebase-admin";
import { Request, Response } from 'express';

const addUser = async (req: Request, res: Response) => {
    let email, password, token;
    token = req.headers['authorization']?.split(' ')[1];

    //decoding incomming idToken from Client-site
    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log(decodedToken);
        })
        .catch((error) => {
            console.log('Error verifying ID token:', error);
        });

    const user = await admin.auth().getUserByEmail(email).then(async (userRecord) => {
        console.log('already exists')
    }).catch(async (error) => {
        // if user does not exist than new user is created
        // const { uid } = await admin.auth().createUser({
        //     displayName: email,
        //     password: password,
        //     email: email,
        // });
        // await admin.auth().setCustomUserClaims(uid, { roles: new Array() });
        // console.log(error.message)
    })
};

const abcd = () => {
    console.log('ya sabr')
}

export default { addUser, abcd };