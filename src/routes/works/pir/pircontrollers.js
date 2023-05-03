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
const admin = __importStar(require("firebase-admin"));
const Pir_1 = require("../../../models/Pir");
const WordPair_1 = require("../../../models/WordPair");
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const pirInstance = new Pir_1.Pir(null, null, null, null, null);
const wordPairInstance = new WordPair_1.WordPair(null, null, null, null, null);
const createPir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newPir = req.body.pir;
    newPir.pirId = yield uuidv1();
    const token = req.headers['authorization'].split(' ')[1];
    console.log(newPir);
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield pirInstance.createPir(newPir).then(() => {
                res.status(200).send(newPir);
            }).catch((err) => {
                return res.status(409).send({ error: err.message });
            });
        }
        catch (err) {
            return res.status(409).send({ error: err.message });
        }
    })).catch((err) => {
        return res.status(401).send({ error: err.message });
    });
});
const retrievePirs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        pirInstance.retrievePirs().then((pirs) => {
            return res.status(200).send(pirs);
        });
    })).catch((err) => {
        return res.status(401).send(err.message);
    });
    // pirInstance.retrievePirs().then(async (dataSnapshot) => {
    //     const dataArray = Object.values(dataSnapshot.val());
    //     const newDataArray = await dataArray.map((data: Pir) => {
    //         return {
    //             pirId: data.pirId,
    //             name: data.name
    //         };
    //     });
    //     return res.status(200).send(newDataArray)
    // }).catch((error) => {
    //     return res.status(401).send(error.message);
    // });
});
const createChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chapter = req.body.chapter;
    chapter.chapterId = uuidv1();
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            pirInstance.addChapterToPir(chapter).then(() => {
                res.status(200).send(chapter);
            }).catch((err) => {
                return res.status(409).send({ error: err.message });
            });
        }
        catch (err) {
            return res.status(409).send({ error: err.message });
        }
    })).catch((err) => {
        return res.status(401).send({ error: err.message });
    });
});
const retrieveChaptersByEditorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editorId = req.query.editorId;
    const pirId = req.query.pirId;
    pirInstance.retrievePirs().then((pirs) => {
        const selectedPir = (Object.values(pirs.val()).filter((pir) => pir.pirId === pirId))[0];
        const chapters = Object.values(selectedPir === null || selectedPir === void 0 ? void 0 : selectedPir.chapters).filter((chapter) => chapter.editorId === editorId);
        return res.status(200).send(chapters);
    }).catch((error) => {
        return res.status(401).send(error.message);
    });
});
const updateChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chapter = req.body.chapter;
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const db = admin.database();
        pirInstance.updateChapter(chapter).then((updatedChapter) => {
            return res.status(200).send(updatedChapter);
        });
    })).catch((err) => {
        console.log(err);
    });
});
const updatePir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pir = req.body.pir;
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        pirInstance.updatePir(pir).then((updatedPir) => {
            return res.status(200).send(updatedPir);
        });
    })).catch((err) => {
        console.log(err);
    });
});
const createWordPair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordpair = req.body.wordpair;
    wordpair.wordPairId = uuidv1();
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        yield wordPairInstance.createWordPair(wordpair);
        return res.status(200).send(wordpair);
    })).catch((err) => {
        return res.status(401).send({ error: err.message });
    });
});
const updateWordPair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordPair = req.body.wordPair;
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        wordPairInstance.updateWordPair(wordPair).then((updatedWordPair) => {
            return res.status(200).send(updatedWordPair);
        });
    })).catch((err) => {
        console.log(err);
    });
});
const deletePir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pirId = req.body.pirId;
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        pirInstance.deletePir(pirId).then(() => {
            return res.status(200).send({ info: 'the book at' + pirId + 'id! deleted' });
        });
    })).catch((err) => {
        console.log(err);
    });
});
exports.default = { createPir, createChapter, retrievePirs, retrieveChaptersByEditorId, updateChapter, updatePir, createWordPair, updateWordPair, deletePir };
