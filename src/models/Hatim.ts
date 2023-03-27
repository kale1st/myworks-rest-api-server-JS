import { getDatabase, ref, set } from "firebase/database";
import { cuz } from "./cuz"
import * as admin from "firebase-admin";

export class Hatim {
    hatim: cuz[]
    totalHatim: number

    createHatim = () => {
        const db = getDatabase();
        for (let index = 1; index < 31; index++) {
            set(ref(db, `Hatim/cuzs/${index}`), {
                cuzname: index,
                beingRead: false,
                complete: false,
                reader: ''
            });
            // set(ref(db, 'Hatim/totalhatim'), {
            //     totalHatim: 0
            // });
        }
    }

    retrieveAllCuzs = () => {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('Hatim');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                const cuzs = data['cuzs']
                const totalHatim = data['totalhatim']
                return { cuzs: cuzs, totalHatim: totalHatim }

            } else {
                return { cuzs: null, totalHatim: null }
            }
        }, (error) => {
            return { error: error }
        });

    }

    getSingleCuz = (cuznumber: number) => {

    }
}