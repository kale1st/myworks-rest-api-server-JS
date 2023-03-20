import { getDatabase, ref, set } from "firebase/database";
import { cuz } from "./cuz"

export class Hatim {
    hatim: cuz[]
    totalHatim: number

    createHatim = () => {
        const db = getDatabase();
        for (let index = 1; index < 31; index++) {
            set(ref(db, `Hatim/cuzs/cuz-${index}`), {
                beingRead: false,
                complete: false,
                reader: ''
            });
            set(ref(db, 'Hatim/totalhatim'), {
                totalHatim: 0
            });
        }
    }
}