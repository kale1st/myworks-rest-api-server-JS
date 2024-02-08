import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from 'express';

const tokenControl = async (req: Request | any, res: Response | any, next: NextFunction) => {
    const checkRevoked = true;
    try {
        const idToken: any = await req.body.token || req.headers['authorization'].split(' ')[1];
        admin.auth()
            .verifyIdToken(idToken, checkRevoked)
            .then((payload) => {
                // Token is valid.               
                next()
            })
            .catch((err: any) => {
                return res.status(401).send(err.message);
            });
    } catch (error: any) {
        return res.status(401).send(error.message);
    }

}

export default tokenControl;