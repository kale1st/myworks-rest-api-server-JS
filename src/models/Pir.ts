import { getDatabase, ref, set } from "firebase/database";

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: {
        chapterName: string;
        chapterContent: string;
    }[]

    constructor(
        name: string | any,
        description: string,
        chapters: [{
            chapterName: string;
            chapterContent: string;
        }]
    ) {
        this.name = name
        this.description = description
        this.chapters = chapters

    }

    async createPir(pir: Pir) {
        const db = getDatabase();
        await set(ref(db, 'pir/' + pir.pirId), pir);
        // await set(ref(db, 'users/' + pir.editorId + '/works/pirs/' + pir.pirId), { pir: pir.pirId });
    }

    async retrieveEditors() {

    }
};