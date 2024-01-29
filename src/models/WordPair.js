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
exports.WordPair = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
const rxjs_1 = require("rxjs");
class WordPair {
    constructor(word, meaning, chapterId, pirId, editorId) {
        this.word = word;
        this.meaning = meaning;
        this.chapterId = chapterId;
        this.pirId = pirId;
        this.editorId = editorId;
    }
    async createWordPair(wordPair) {
        const db = (0, database_1.getDatabase)();
        await (0, database_1.set)((0, database_1.ref)(db, 'pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId), wordPair);
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
    async retrieveAllWordPairsOfSinglePir(pirId) {
        return new Promise((resolve, reject) => {
            const nodeRef = admin.database().ref('pirs/' + pirId + '/chapters');
            // Read the data at the node once
            nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    const chapters = snapshot.val();
                    return (0, rxjs_1.from)(Object.values(chapters)).pipe((0, rxjs_1.filter)((chapter) => chapter.wordPairs), // Filter out chapters without wordPairs
                    (0, rxjs_1.mergeMap)((chapter) => Object.values(chapter.wordPairs)), // Merge all wordPairs into a single stream
                    (0, rxjs_1.toArray)() // Collect the wordPairs into an array
                    ).subscribe({
                        next: ((arrWordPairs) => {
                            return resolve(arrWordPairs);
                        })
                    });
                }
            });
        });
    }
    async updateWordPair(wordPair) {
        const db = admin.database();
        const ref = db.ref('pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId);
        return ref.update(wordPair)
            .then((ress) => {
            return { ress };
        })
            .catch((error) => {
            console.error("Error updating data:", error);
            return { errror: error };
        });
    }
    async deleteWordPair(wordPair) {
        const ref = await admin.database().ref('pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/');
        return await ref.child(wordPair.wordPairId).remove();
    }
}
exports.WordPair = WordPair;
