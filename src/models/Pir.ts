import { getDatabase, ref, set } from "firebase/database";
import { Chapter } from "./Chapter";
import * as admin from "firebase-admin";

const db = getDatabase();

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: Chapter[];

    constructor(
        pirId: any,
        editorId: any,
        name: string | any,
        description: string,
        chapters: Chapter[],
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapters = chapters

    }


    async createPir(pir: Pir) {
        await set(ref(db, 'pir/' + pir.pirId), {
            pirId: pir.pirId,
            name: pir.name,
            description: pir.description,
            editorId: pir.editorId,
        });
    }

    async addChapterToPir(chapter: Chapter) {
        await set(ref(db, 'pir/' + chapter.pirId + '/chapters/' + chapter.chapterId), {
            chapterName: chapter.chapterName,
            chapterContent: chapter.chapterContent,
            editorId: chapter.editorId,
            pirId: chapter.pirId,
            createDate: chapter.createDate,
            chapterId: chapter.chapterId
        });

        // await set(ref(db, 'users/' + pir.editorId + '/works/pirs/' + pir.pirId), { pir: pir.pirId });
    }

    async retrievePirs() {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('pir');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async updateChapter(chapter: Chapter) {
        const db = admin.database();
        const ref = db.ref('pir/' + chapter.pirId + '/chapters/' + chapter.chapterId);
        return ref.update(chapter)
            .then(() => {
                return { chapter }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async updatePir(pir: Pir) {
        const db = admin.database();
        const ref = db.ref('pir/' + pir.pirId);
        return ref.update(pir)
            .then(() => {
                return { pir }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async retrieveChaptersNamesByPirId(pirId: any) {
        const nodeRef = admin.database().ref('pir/' + pirId);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async retrieveChapterByChapterId(chapterId: any, pirId: any) {
        const nodeRef = admin.database().ref(`pir/${pirId}/chapters/${chapterId}`);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async deletePir(pirId: any) {
        const ref = await admin.database().ref('pir/');
        return await ref.child(pirId).remove();
    }
};