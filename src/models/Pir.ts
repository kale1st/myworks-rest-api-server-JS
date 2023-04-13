import { getDatabase, ref, set } from "firebase/database";
import { Chapter } from "./Chapter";
const db = getDatabase();

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapter: Chapter

    constructor(
        editorId: any,
        name: string | any,
        description: string,
        chapter: Chapter
    ) {
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapter = chapter

    }

    async createPir(pir: Pir) {
        await set(ref(db, 'pir/' + pir.pirId), {
            name: pir.name,
            description: pir.description,
            editorId: pir.editorId
        });
        await set(ref(db, 'pir/' + pir.pirId + '/chapters/' + pir.chapter.chapterId), {
            chapterName: pir.chapter.chapterName,
            chapterContent: pir.chapter.chapterContent
        });

    }

    async addChapterToPir(pir: Pir) {
        await set(ref(db, 'pir/' + pir.pirId + '/chapters/' + pir.chapter.chapterId), {
            chapterName: pir.chapter.chapterName,
            chapterContent: pir.chapter.chapterContent
        });

        // await set(ref(db, 'users/' + pir.editorId + '/works/pirs/' + pir.pirId), { pir: pir.pirId });
    }
};