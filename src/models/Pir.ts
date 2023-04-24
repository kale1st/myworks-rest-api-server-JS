import { getDatabase, ref, set } from "firebase/database";
import { Chapter } from "./Chapter";
import * as admin from "firebase-admin";
import { EditedWord } from "./editedWord";

const db = getDatabase();

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: Chapter[];
    wordPairs: EditedWord[]

    constructor(
        pirId: any,
        editorId: any,
        name: string | any,
        description: string,
        chapters: Chapter[],
        wordPairs: EditedWord[]
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapters = chapters
        this.wordPairs = wordPairs

    }


    async createPir(pir: Pir) {
        await set(ref(db, 'pir/' + pir.pirId), {
            pirId: pir.pirId,
            name: pir.name,
            description: pir.description,
            editorId: pir.editorId,
        });
        await set(ref(db, 'pir/' + pir.pirId + '/chapters/' + pir.chapters[0].chapterId + '/'), pir.chapters[0]
        );

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
    async createEditedWordPair(wordPair: EditedWord) {
        await set(ref(db, 'pir/' + wordPair.pirId + '/wordpairs/' + wordPair.wordPairId), wordPair);
    }
    //display for users (readers)
    async retrievePirsNames() {
        const pirNode = admin.database().ref('pir');

        pirNode.once("value", async (dataSnapshot: any) => {
            const dataArray = Object.values(dataSnapshot.val())
            // console.log(arr)

            const newDataArray = await dataArray.map((data: Pir) => {
                return {
                    pirId: data.pirId,
                    pirName: data.name
                };
            });
            console.log(newDataArray)
            return newDataArray
        });
    }

    async retrievePirByPirId(pirId: any) {
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

};