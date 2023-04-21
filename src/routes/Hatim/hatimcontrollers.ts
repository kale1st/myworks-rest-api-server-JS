import { Request, Response } from 'express';
import { Hatim } from '../../models/Hatim';
import * as admin from "firebase-admin";

const hatim = new Hatim();
const createHatim = async (req: Request, res: Response) => {

    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        await hatim.createHatim();
    }).catch((err) => {
        return res.status(401).send(err.message);
    })
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
const updateHatim = async (req: Request, res: Response) => {
    const { cuz, cuznumber } = req.body;
    const token = req.headers['authorization'].split(' ')[1];

    await admin.auth().verifyIdToken(token).then(async (response) => {
        await hatim.updateHatim(cuznumber, cuz).then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            return res.status(401).send(err.message);
        })
    }).catch((err) => {
        console.log(err)
    })
}
const deleteHatim = async (req: Request, res: Response) => {
    console.log('deleted')
}
const getSingleCuz = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const cuznumber: number | any = req.query.cuznumber;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        //
        await hatim.getSingleCuz(cuznumber).then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            return res.status(401).send(err.message);
        })
        //
    }).catch((err) => {
        return res.status(401).send(err.message);
    })
}
const getReaderName = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        return res.send(response)
        //
    }).catch((err) => {
        return res.status(401).send(err.message);
    })

}
//to show name of another user who got cuz before
const getNameOfAnotherUsers = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const userId = req.query.uid as string
    await admin.auth().verifyIdToken(token).then(async (response) => {
        if (userId && userId.length <= 128) {
            await admin.auth().getUser(userId)
                .then((userRecord) => {
                    return res.send({ readername: userRecord.displayName })
                })
                .catch((error) => {
                    console.error('Error fetching user record:', error);
                });
        }
        else res.send('no reader found')

    }).catch((err) => {
        return res.status(401).send(err.message);
    })
}
export default { createHatim, retrieveHatim, getSingleCuz, deleteHatim, updateHatim, getReaderName, getNameOfAnotherUsers };