"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHB = void 0;
const database_1 = require("firebase/database");
class SHB {
    constructor(shbId, shbName, editorId, createDate, shbInfo, shbHistory) {
        this.createShb = (shb) => {
            const db = (0, database_1.getDatabase)();
            (0, database_1.set)((0, database_1.ref)(db, 'users/' + shb.editorId + '/works/shb/' + shb.shbId), shb);
        };
        this.shbId = shbId,
            this.shbName = shbName,
            this.shbInfo = shbInfo,
            this.shbHistory = shbHistory;
        this.editorId = editorId,
            this.createDate = createDate;
    }
}
exports.SHB = SHB;
