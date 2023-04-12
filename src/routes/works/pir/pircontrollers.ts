import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { Pir } from '../../../models/Pir';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

const pirInstance = new Pir(null, null, null)
const createPir = async (req: Request, res: Response) => {
    let newPir: Pir = req.body.pir;
    newPir.pirId = await uuidv1();
    const token = req.body.token;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        try {
            await pirInstance.createPir(newPir);
            await res.status(200).send(newPir);
        } catch (err) {
            return res.status(409).send(
                { error: err.message }
            );
        }
    }).catch((err) => {
        return res.status(401).send(
            { error: err.message }
        );
    })
}

const retrievePirs = async (req: Request, res: Response) => {

}

export default { createPir, retrievePirs }