import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();

const updateUserName = async (req: Request, res: Response) => {
    updateProfile(auth.currentUser, {
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        // Profile updated!
        return auth.currentUser
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
};





export default { updateUserName };