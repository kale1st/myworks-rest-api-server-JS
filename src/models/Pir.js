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
exports.Pir = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
const db = (0, database_1.getDatabase)();
class Pir {
    constructor(editorId, name, description, chapters) {
        this.editorId = editorId;
        this.name = name;
        this.description = description;
        this.chapters = chapters;
    }
    createPir(pir) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.set)((0, database_1.ref)(db, 'pir/' + pir.pirId), {
                pirId: pir.pirId,
                name: pir.name,
                description: pir.description,
                editorId: pir.editorId,
            });
            yield (0, database_1.set)((0, database_1.ref)(db, 'pir/' + pir.pirId + '/chapters/' + pir.chapters[0].chapterId + '/'), pir.chapters[0]);
        });
    }
    addChapterToPir(chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.set)((0, database_1.ref)(db, 'pir/' + chapter.pirId + '/chapters/' + chapter.chapterId), {
                chapterName: chapter.chapterName,
                chapterContent: chapter.chapterContent,
                editorId: chapter.editorId,
                pirId: chapter.pirId,
                createDate: chapter.createDate,
                chapterId: chapter.chapterId
            });
            // await set(ref(db, 'users/' + pir.editorId + '/works/pirs/' + pir.pirId), { pir: pir.pirId });
        });
    }
    retrievePirs() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get a reference to the desired node in the database
            const nodeRef = admin.database().ref('pir');
            // Read the data at the node once
            return nodeRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    // access the data from the snapshot if it exists
                    const data = snapshot.val();
                    return data;
                }
                else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            });
        });
    }
    updateChapter(chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = admin.database();
            const ref = db.ref('pir/' + chapter.pirId + '/chapters/' + chapter.chapterId);
            return ref.update(chapter)
                .then(() => {
                return { chapter };
            })
                .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error };
            });
        });
    }
}
exports.Pir = Pir;
;
