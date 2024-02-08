import * as admin from "firebase-admin";
import { Request, Response } from 'express';

const controlTokenExpired = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            return res.status(401).send({
                response: 'Authorization header not provided',
                status: 401,
            });
        }

        const token = authorizationHeader.split(' ')[1];

        await admin.auth().verifyIdToken(token).then(async (response) => {
            return res.status(200).send({
                response: 'valid token!',
                status: 200,
            });
        }).catch((err) => {
            return res.status(401).send({
                response: err.message,
                status: 401,
            });
        });
    } catch (error) {
        return res.status(500).send({
            response: 'Internal server error',
            status: 500,
        });
    }
};


export default { controlTokenExpired };