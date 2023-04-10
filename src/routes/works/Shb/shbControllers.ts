import * as admin from "firebase-admin";
import { Request, Response } from 'express';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
import { SHB } from "../../../models/shb";

const shb_class = new SHB('', '', '', null, null, null, null);

const createShb = async (req: Request, res: Response) => {
    const token = req.body.token
    const shbId = await uuidv1()
    const shbInfo: string[] = []
    const shbHistory: string[] = []
    const { shbName, shbPhotoUrl, editorId, createDate } = req.body;

    await admin.auth().verifyIdToken(token).then(async (response) => {
        try {
            const newShb = await new SHB(
                shbId,
                shbName,
                shbPhotoUrl,
                editorId,
                createDate,
                shbInfo,
                shbHistory
            )
            const shb = await shb_class.createShb(newShb);
            await res.status(200).send(shb);
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