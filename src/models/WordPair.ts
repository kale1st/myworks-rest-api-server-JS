import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";

export class WordPair {
    wordPairId: any;
    word: string;
    meaning: string;
    chapterId: any
    pirId: any;
    editorId: any

    constructor(word: string, meaning: string, chapterId: any, pirId: any, editorId: any) {
        this.word = word;
        this.meaning = meaning
        this.chapterId = chapterId
        this.pirId = pirId
        this.editorId = editorId
    }

    async createWordPair(wordPair: WordPair) {
        const db = getDatabase();
        await set(ref(db, 'pir/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId), wordPair);
    }

    async updateWordPair(wordPair: WordPair) {
        console.log(wordPair)

        const db = admin.database();
        const ref = db.ref('pir/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId);

        return ref.update(wordPair)
            .then((ress) => {
                return { ress }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }
}