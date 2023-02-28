import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from 'express';

const tokenControl = async (req: Request, res: Response, next: NextFunction) => {
    let checkRevoked = true;
    try {
        const idToken = await req.body.token || req.headers['authorization'].split(' ')[1];
        admin.auth()
            .verifyIdToken(idToken, checkRevoked)
            .then((payload) => {
                // Token is valid.               
                next()
            })
            .catch((err) => {
                return res.status(401).send(err.message);
            });
    } catch (error) {
        return res.status(401).send(error.message);
    }

}

export default tokenControl;