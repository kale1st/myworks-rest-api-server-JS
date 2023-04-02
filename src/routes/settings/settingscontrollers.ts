import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { getAuth, updatePassword } from "firebase/auth";
const auth = getAuth();

const getUserInfo = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const auth = getAuth();
    const user = auth.currentUser;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        //
        if (user) {
            return res.status(200).send(user)
        }
        else
            return res.status(401).send();
    })
}

const updateUserInfo = async (req: Request, res: Response) => {
    const user = auth.currentUser;
    const newPassword = "123456";

    updatePassword(user, newPassword).then((dsds) => {
        // Update successful.
        return res.status(200).send(dsds);
    }).catch((error) => {
        // An error ocurred
        // ...
    });
}


export default { getUserInfo, updateUserInfo };