import { getDatabase, ref, set } from "firebase/database";
import { cuz } from "./cuz"
import * as admin from "firebase-admin";

export class Hatim {
    hatim: cuz[] = [];
    totalHatim: number = 0;

    createHatim = (groupId: any) => {
        const db = getDatabase();
        for (let index = 1; index < 31; index++) {
            set(ref(db, `groups/${groupId}/works/hatim/cuzs/${index}`), {
                cuzname: index,
                beingRead: false,
                complete: false,
                reader: ''
            });
            set(ref(db, `groups/${groupId}/works/hatim/totalHatim`), {
                totalHatim: 0
            });
        }
    }

    retrieveAllCuzs = (groupId: any) => {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref(`groups/${groupId}/works/hatim`);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                const cuzs = data['cuzs']
                const totalHatim = data['totalHatim']
                console.log({ cuzs: cuzs, totalHatim: totalHatim }
                )
                return { cuzs: cuzs, totalHatim: totalHatim }

            } else {
                return { cuzs: null, totalHatim: null }
            }
        }, (error) => {
            return { error: error }
        });

    }

    updateHatim = (cuznumber: number, cuz: cuz, groupId: any) => {
        const db = admin.database();
        const ref = db.ref(`groups/${groupId}/works/hatim/cuzs/${cuznumber}`);
        return ref.update(cuz)
            .then(() => {
                return { cuz }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    getSingleCuz = (cuzname: any, groupId: any) => {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref(`groups/${groupId}/works/hatim/cuzs/${cuzname}`);
        // Read the data at the node once
        return nodeRef.once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                console.log(data)
                return JSON.stringify({ cuz: data })// prints the data from the node
            })
            .catch((error) => {
                console.error(error);
            });


    }
}