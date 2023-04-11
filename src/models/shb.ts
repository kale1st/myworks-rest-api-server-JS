import { getDatabase, ref, set } from "firebase/database";

export class SHB {
    shbId: any;
    shbName: string;
    editorId: any; //userId
    createDate: Date;
    shbInfo: string[];
    shbHistory: string[];

    constructor(shbId: any, shbName: string, editorId: any, createDate: Date, shbInfo: string[], shbHistory: string[]) {
        this.shbId = shbId,
            this.shbName = shbName,
            this.shbInfo = shbInfo,
            this.shbHistory = shbHistory
        this.editorId = editorId,
            this.createDate = createDate
    }

    createShb = (shb: SHB) => {
        const db = getDatabase();
        set(ref(db, 'users/' + shb.editorId + '/works/shb/' + shb.shbId), shb);
    }

}