import * as admin from "firebase-admin";
import { Request, Response } from 'express';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
import { SHB } from "../../../models/shb";

const shb_class = new SHB('', '', '', new Date, [], []);

const createShb = async (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    const { shbName, editorId, createDate } = req.body.shb;

    const newShb: SHB | any = {
        shbId: uuidv1(),
        shbName,
        editorId,
        createDate,
        shbInfo: [],
        shbHistory: [],
        // Add other properties as needed
    };

    try {
        await admin.auth().verifyIdToken(token);

        // Assuming that shb_class.createShb is a function that creates the SHB
        await shb_class.createShb(newShb);

        return res.status(200).send(newShb);
    } catch (err: any) {
        console.error('Error creating SHB:', err);
        return res.status(409).send({ error: err.message });
    }
};

export default { createShb };