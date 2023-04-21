import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { getAuth, updatePassword } from "firebase/auth";
const auth = getAuth();

const getUserInfo = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        if (response)
            admin.auth().getUserByEmail(response.email).then((user) => {
                return res.status(200).send(user)
            })
        else
            return res.status(404).send('user not found')

    })
}
const updateUser = async (req: Request, res: Response) => {
    const { updateObject } = req.body
    admin.auth().getUserByEmail(updateObject.email)
        .then((userRecord) => {
            // Update the user's profile information
            return admin.auth().updateUser(userRecord.uid, updateObject).then((response) => {
                return res.status(200).send(response);
            });
        })
        .then((error) => {
            return res.status(404).send(error);
        })
        .catch((error) => {
            console.error('Error updating user profile:', error);
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