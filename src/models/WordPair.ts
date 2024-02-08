import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";
import { Observable, Observer, catchError, concatMap, filter, from, map, mergeMap, tap, throwError, toArray } from "rxjs";
import { Group } from "./Group";
import { Chapter } from "./Chapter";

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
        await set(ref(db, 'pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId), wordPair);
    }

    // async retrieveAllWordPairsOfSinglePir(pirId: any): Promise<WordPair[]> {
    //     const nodeRef = admin.database().ref('pirs/' + pirId + '/chapters');

    //     return new Promise<WordPair[]>((resolve, reject) => {
    //         nodeRef.once('value', (snapshot) => {
    //             if (snapshot.exists()) {
    //                 const chapters: { [key: string]: { wordPairs?: WordPair[] } } = snapshot.val();
    //                 const wordPairsObservable: Observable<WordPair[]> = from(Object.values(chapters))
    //                     .pipe(
    //                         filter((chapter) => chapter.wordPairs !== undefined), // Filter out chapters without wordPairs
    //                         mergeMap((chapter) => chapter.wordPairs ?? []), // Merge all wordPairs into a single stream
    //                         toArray() // Collect the wordPairs into an array
    //                     );

    //                 wordPairsObservable.subscribe({
    //                     next: (arrWordPairs: WordPair[]) => {
    //                         resolve(arrWordPairs);
    //                     },
    //                     error: (err) => {
    //                         reject(err);
    //                     },
    //                     complete: () => {
    //                         // Optional: You can handle completion here if needed
    //                     },
    //                 } as Observer<WordPair[]>); // Explicitly specify the Observer type
    //             } else {
    //                 // Handle the case where the node doesn't exist or is null
    //                 resolve([]);
    //             }
    //         });
    //     });
    // }
    async retrieveAllWordPairsOfSinglePir(pirId: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            const nodeRef = admin.database().ref('pirs/' + pirId + '/chapters');
            // Read the data at the node once
            nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    const chapters = snapshot.val();
                    return from(Object.values(chapters)).pipe(
                        filter((chapter: any) => chapter.wordPairs), // Filter out chapters without wordPairs
                        mergeMap((chapter: any) => Object.values(chapter.wordPairs)), // Merge all wordPairs into a single stream
                        toArray() // Collect the wordPairs into an array
                    ).subscribe({
                        next: ((arrWordPairs: any[]) => {
                            return resolve(arrWordPairs)
                        })
                    })
                }
            })
        })
    }


    async updateWordPair(wordPair: WordPair) {
        const db = admin.database();
        const ref = db.ref('pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId);

        return ref.update(wordPair)
            .then((ress) => {
                return { ress }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async deleteWordPair(wordPair: WordPair) {
        const ref = await admin.database().ref('pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/');
        return await ref.child(wordPair.wordPairId).remove();

    }
}