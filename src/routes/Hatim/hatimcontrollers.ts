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
        hatim.retrieveAllCuzs().then((data) => {
            res.status(202).send(data);
        }).catch((err) => {
            return res.status(401).send(err.message);
        })
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
        const db = admin.database();
        const ref = db.ref('Hatim/cuzs/' + cuznumber);
        return ref.update(cuz)
            .then(async () => {
                return await res.send(
                    { cuz }
                );
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });


    }).catch((err) => {
        console.log(err)
    })
}

export default { createHatim, retrieveHatim, deleteHatim, updateHatim };