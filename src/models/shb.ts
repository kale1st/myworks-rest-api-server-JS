import { getDatabase, ref, set } from "firebase/database";

export class SHB {
    shbName: string;
    shbPhotoUrl: string;
    shbInfo: string;

    constructor(shbName: string, shbPhotoUrl: string, shbInfo: string) {
        this.shbName = shbName,
            this.shbPhotoUrl = shbPhotoUrl,
            this.shbInfo = shbInfo
    }

    createShb = (userId: number, shbId: number, shb: SHB) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId + '/works/shb/' + shbId), shb);
    }

}