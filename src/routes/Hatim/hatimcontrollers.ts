import { Request, Response } from 'express';
import { Hatim } from '../../models/Hatim';
import * as admin from "firebase-admin";

const hatim = new Hatim();
const createHatim = async (req: Request, res: Response) => {
    hatim.createHatim();
};
const retrieveHatim = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('Hatim');
        // Read the data at the node once
        nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it wxists
                const data = snapshot.val();
                const cuzs = data['cuzs']
                const totalHatim = data['totalhatim']
                return res.status(200).send({ cuzs: cuzs, totalHatim: totalHatim });
            } else {
                // handle the case where the node doesn't exist or is null
            }

        }, (error) => {
            return res.status(404).send(error);
        });
    }).catch((err) => {
        return res.status(401).send(err.message);
    })

}
const deleteHatim = async (req: Request, res: Response) => {
    console.log('deleted')
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