import { Request, Response } from 'express';
import { Hatim } from '../../models/Hatim';
import * as admin from "firebase-admin";

const hatim = new Hatim();
const createHatim = async (req: Request, res: Response) => {
    await hatim.createHatim();
};
const retrieveHatim = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        //
        await hatim.retrieveAllCuzs().then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            return res.status(401).send(err.message);
        })
        //
    }).catch((err) => {
        return res.status(401).send(err.message);
    })

}
const deleteHatim = async (req: Request, res: Response) => {
    console.log('deleted')
}

const getSingleCuz = async (req: Request, res: Response) => {

}
const updateHatim = async (req: Request, res: Response) => {
    const { cuz, cuznumber, token } = req.body
    await admin.auth().verifyIdToken(token).then(async (response) => {
        //
        await hatim.updateHatim(cuznumber, cuz).then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            return res.status(401).send(err.message);
        })
        //   

    }).catch((err) => {
        console.log(err)
    })
}

export default { createHatim, retrieveHatim, deleteHatim, updateHatim };