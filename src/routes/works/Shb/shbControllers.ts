import * as admin from "firebase-admin";
import { Request, Response } from 'express';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
import { SHB } from "../../../models/shb";

const shb_class = new SHB('', '', '', null, null, null);

const createShb = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const shbId = await uuidv1()
    const shbInfo: string[] = []
    const shbHistory: string[] = []
    const { shbName, editorId, createDate } = req.body.shb;

    let newShb: SHB = req.body.shb;
    newShb.shbId = await uuidv1()

    await admin.auth().verifyIdToken(token).then(async (response) => {
        try {
            await shb_class.createShb(newShb);
            await res.status(200).send(newShb);
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
};

export default { createShb };