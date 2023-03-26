"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hatim = void 0;
const database_1 = require("firebase/database");
class Hatim {
    constructor() {
        this.createHatim = () => {
            const db = (0, database_1.getDatabase)();
            for (let index = 1; index < 31; index++) {
                (0, database_1.set)((0, database_1.ref)(db, `Hatim/cuzs/${index}`), {
                    cuzname: index,
                    beingRead: false,
                    complete: false,
                    reader: ''
                });
                // set(ref(db, 'Hatim/totalhatim'), {
                //     totalHatim: 0
                // });
            }
        };
    }
}
exports.Hatim = Hatim;
