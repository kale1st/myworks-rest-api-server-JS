import { Request, Response } from 'express';
import * as admin from "firebase-admin";

const getUserInfo = async (req: Request, res: Response) => {
    try {
        const idToken = await req.body.token || req.headers['authorization'].split(' ')[1];
        admin.auth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                // Token is valid.   
                console.log(decodedToken)
                return decodedToken
            })
            .catch((err) => {
                return res.status(401).send(err.message);
            });
    } catch (error) {
        return res.status(401).send(error.message);
    }
    return true
}

export default { getUserInfo };