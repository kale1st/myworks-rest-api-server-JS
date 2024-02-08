import { Request, Response } from 'express';
import { Hatim } from '../../models/Hatim';
import * as admin from "firebase-admin";

const hatim = new Hatim();
const createHatim = async (req: Request, res: Response) => {
    const { groupId } = req.body;
    return await hatim.createHatim(groupId);
};

const retrieveHatim = async (req: Request, res: Response) => {
    const groupId = req.query.groupId

    await hatim.retrieveAllCuzs(groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    })


}

const updateHatim = async (req: Request, res: Response) => {
    const { cuz, cuznumber, groupId } = req.body;

    await hatim.updateHatim(cuznumber, cuz, groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    })
}

const deleteHatim = async (req: Request, res: Response) => {
    console.log('deleted')
}

const getSingleCuz = async (req: Request, res: Response) => {
    const cuzname: any = req.query.cuzname;
    const groupId = req.query.groupId;
    console.log(cuzname + '  ' + groupId)
    await hatim.getSingleCuz(cuzname, groupId).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        return res.status(401).send(err.message);
    })

}
const getReaderName = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }

        const response = await admin.auth().verifyIdToken(token);
        return res.status(200).send({ readerName: response.displayName, uid: response.uid });
    } catch (err: any) {
        console.error("Error getting reader name:", err);
        return res.status(401).send({ error: err.message });
    }
}
//to show name of another user who got cuz before
const getNameOfAnotherUsers = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const userId = req.query.uid as string;

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }

        if (userId && userId.length <= 128) {
            const response = await admin.auth().verifyIdToken(token);

            const userRecord = await admin.auth().getUser(userId);
            return res.status(200).send({ readername: userRecord.displayName });
        } else {
            return res.send('No reader found');
        }
    } catch (err: any) {
        console.error('Error fetching user record:', err);
        return res.status(401).send({ error: err.message });
    }
}
export default { createHatim, retrieveHatim, getSingleCuz, deleteHatim, updateHatim, getReaderName, getNameOfAnotherUsers };