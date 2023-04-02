import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
const auth = getAuth();

const getUserInfo = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const auth = getAuth();
    const user = auth.currentUser;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        //
        if (user) {
            console.log(user)
            return res.status(200).send(user)
        }
        else
            return res.status(401).send();
    })
}
const updateUser = async (req: Request, res: Response) => {
    const { updateObject } = req.body

    updateProfile(auth.currentUser, {
        photoURL: updateObject.photoURL,
        displayName: updateObject.displayName,
    }).then(() => {
        console.log('profile updated')
        return auth.currentUser
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
};
const updateUserPassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body
    const user = auth.currentUser;

    updatePassword(user, newPassword).then(() => {
        // Update successful.
        return res.status(200).send('Password is updated');
    }).catch((error) => {
        return res.status(401).send("Password couldn't be updated");
    });
}


export default { getUserInfo, updateUser, updateUserPassword };