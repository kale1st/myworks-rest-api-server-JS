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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    createWordPair(wordPair) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDatabase)();
            yield (0, database_1.set)((0, database_1.ref)(db, 'pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId), wordPair);
        });
    }
    retrieveAllWordPairsOfSinglePir(pirId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            //         let wordpairs: any[] = []
            //         return await Object.values(chapters).map((data: any) => {
            //             if (data.wordPairs) {
            //                 Object.values(data.wordPairs).map((wp: WordPair) => {
            //                     wordpairs.push(wp)
            //                 })
            //             }
            //         })
            //     } else {
            //         return null
            //     }
            // }, (error) => {
            //     return { error: error }
            // });
        });
    }
    updateWordPair(wordPair) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    deleteWordPair(wordPair) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = yield admin.database().ref('pirs/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/');
            return yield ref.child(wordPair.wordPairId).remove();
        });
    }
}
exports.WordPair = WordPair;
