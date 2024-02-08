import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from 'express';

export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idToken = req.body.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

        if (!idToken) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        if (decodedToken.roles && (decodedToken.roles.includes('admin') || decodedToken.roles.includes('mentor'))) {
            next();
        } else {
            console.log('Unauthorized access: Insufficient role');
            return res.status(403).send('Forbidden: Insufficient role');
        }

        return decodedToken.roles;
    } catch (error: any) {
        console.error('Error verifying token:', error);
        return res.status(401).send('Unauthorized: ' + error.message);
    }
};

export default checkRole;