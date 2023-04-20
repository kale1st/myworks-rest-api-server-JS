import * as admin from "firebase-admin";
import { Request, Response } from 'express';

const controlTokenExpired = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        return res.status(200).send({
            response: 'valid token!',
            status: 200,
        });

    }).catch((err) => {
        return res.status(401).send(err.message);
    })
}
export default { controlTokenExpired };