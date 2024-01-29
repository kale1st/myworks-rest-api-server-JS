"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hatim = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
class Hatim {
    constructor() {
        this.hatim = [];
        this.totalHatim = 0;
        this.createHatim = (groupId) => {
            const db = (0, database_1.getDatabase)();
            for (let index = 1; index < 31; index++) {
                (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/works/hatim/cuzs/${index}`), {
                    cuzname: index,
                    beingRead: false,
                    complete: false,
                    reader: ''
                });
                (0, database_1.set)((0, database_1.ref)(db, `groups/${groupId}/works/hatim/totalHatim`), {
                    totalHatim: 0
                });
            }
        };
        this.retrieveAllCuzs = (groupId) => {
            // Get a reference to the desired node in the database
            const nodeRef = admin.database().ref(`groups/${groupId}/works/hatim`);
            // Read the data at the node once
            return nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    // access the data from the snapshot if it exists
                    const data = snapshot.val();
                    const cuzs = data['cuzs'];
                    const totalHatim = data['totalHatim'];
                    console.log({ cuzs: cuzs, totalHatim: totalHatim });
                    return { cuzs: cuzs, totalHatim: totalHatim };
                }
                else {
                    return { cuzs: null, totalHatim: null };
                }
            }, (error) => {
                return { error: error };
            });
        };
        this.updateHatim = (cuznumber, cuz, groupId) => {
            const db = admin.database();
            const ref = db.ref(`groups/${groupId}/works/hatim/cuzs/${cuznumber}`);
            return ref.update(cuz)
                .then(() => {
                return { cuz };
            })
                .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error };
            });
        };
        this.getSingleCuz = (cuzname, groupId) => {
            // Get a reference to the desired node in the database
            const nodeRef = admin.database().ref(`groups/${groupId}/works/hatim/cuzs/${cuzname}`);
            // Read the data at the node once
            return nodeRef.once('value')
                .then((snapshot) => {
                const data = snapshot.val();
                console.log(data);
                return JSON.stringify({ cuz: data }); // prints the data from the node
            })
                .catch((error) => {
                console.error(error);
            });
        };
    }
}
exports.Hatim = Hatim;
