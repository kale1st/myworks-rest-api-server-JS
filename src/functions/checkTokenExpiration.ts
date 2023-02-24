import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from 'express';

const tokenControl = async (req: Request, res: Response, next: NextFunction) => {
    let checkRevoked = true;
    const idToken = await req.body.token;
    admin.auth()
        .verifyIdToken(idToken, checkRevoked)
        .then((payload) => {
            // Token is valid.           
            next();
        })
        .catch((error) => {
            if (error.code == 'auth/id-token-revoked') {
                // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
            } else {
                // Token is invalid.
            }
        });
}

export default tokenControl;