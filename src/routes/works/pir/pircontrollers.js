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
const admin = __importStar(require("firebase-admin"));
const Pir_1 = require("../../../models/Pir");
const WordPair_1 = require("../../../models/WordPair");
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const pirInstance = new Pir_1.Pir(null, null, null, null, '', [], []);
const wordPairInstance = new WordPair_1.WordPair('', '', null, null, null);
const createPir = async (req, res) => {
    let newPir = req.body.pir;
    if (newPir.pirId === null) {
        newPir.pirId = await uuidv1();
    }
    await pirInstance.createPir(newPir).then(() => {
        res.status(200).send(newPir);
    }).catch((err) => {
        return res.status(409).send({ error: err.message });
    });
};
const assingPirToGroup = async (req, res) => {
    const { pirinfo, groupId } = req.body;
    pirInstance.assignPirToGroup(pirinfo, groupId).then((pir) => {
        res.status(200).send({ response: pir + ' added' });
    }).catch((error) => {
        res.status(401).send({ error: error.message });
    });
};
// const retrievePirs = async (req: Request, res: Response) => {
//     const pirEditorId = req.query.pirEditorId;
//     pirInstance.retrievePirsByPirEditorId(pirEditorId).then((pirs) => {
//         return res.status(200).send(pirs)
//     })
// }
const createChapter = async (req, res) => {
    const chapter = req.body.chapter;
    chapter.chapterId = uuidv1();
    pirInstance.addChapterToPir(chapter).then(() => {
        res.status(200).send(chapter);
    }).catch((err) => {
        return res.status(409).send({ error: err.message });
    });
};
const retrieveChaptersByEditorId = async (req, res) => {
    try {
        const editorId = req.query.editorId;
        const pirId = req.query.pirId;
        const pirs = await pirInstance.retrievePirs();
        const selectedPir = Object.values(pirs.val()).find((pir) => pir.pirId === pirId);
        if (!selectedPir) {
            return res.status(404).send({ error: 'Selected pir not found' });
        }
        const chapters = Object.values(selectedPir.chapters).filter((chapter) => chapter.editorId === editorId);
        return res.status(200).send(chapters);
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
};
const retrieveAllChapters = async (req, res) => {
    try {
        const pirId = req.query.pirId;
        const pirs = await pirInstance.retrievePirs();
        const selectedPir = Object.values(pirs.val()).find((pir) => pir.pirId === pirId);
        if (!selectedPir) {
            return res.status(404).send({ error: 'Selected pir not found' });
        }
        const chapters = selectedPir.chapters;
        return res.status(200).send(chapters);
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
};
const updateChapter = async (req, res) => {
    const chapter = req.body.chapter;
    pirInstance.updateChapter(chapter).then((updatedChapter) => {
        return res.status(200).send(updatedChapter);
    });
};
const updatePir = async (req, res) => {
    const pir = req.body.pir;
    pirInstance.updatePir(pir).then((updatedPir) => {
        return res.status(200).send(updatedPir);
    });
};
const createWordPair = async (req, res) => {
    const wordpair = req.body.wordpair;
    await wordPairInstance.createWordPair(wordpair);
    return res.status(200).send(wordpair);
};
const updateWordPair = async (req, res) => {
    var _a, _b;
    try {
        const wordPair = req.body.wordPair;
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['authorization']) === null || _b === void 0 ? void 0 : _b.split(' ')[1]; // Check if headers is defined
        if (!token) {
            return res.status(401).send({ error: 'Authorization token not provided' });
        }
        const response = await admin.auth().verifyIdToken(token);
        const updatedWordPair = await wordPairInstance.updateWordPair(wordPair);
        return res.status(200).send(updatedWordPair);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};
const deletePir = async (req, res) => {
    const pirId = req.body.pirId;
    // pirInstance.deletePir(pirId).then(() => {
    //     return res.status(200).send(
    //         { info: 'the book at' + pirId + 'id! deleted' }
    //     );
    // })
};
const retrieveAllWordPairsOfSinglePir = async (req, res) => {
    const pirId = req.query.pirId;
    wordPairInstance.retrieveAllWordPairsOfSinglePir(pirId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        return res.status(401).send({ error: error.message });
    });
};
const deleteChapter = async (req, res) => {
    const pirId = req.body.pirId;
    const chapterId = req.body.chapterId;
    pirInstance.deleteChapter(pirId, chapterId).then(() => {
        return res.status(200).send({ info: 'the chapter at' + pirId + 'id! deleted' });
    });
};
const deleteWordPair = async (req, res) => {
    const wordPair = req.body.wordPair;
    wordPairInstance.deleteWordPair(wordPair).then((ress) => {
        return res.status(200).send({ info: wordPair.word + ' deleted' });
    });
};
const retrievePirList = async (req, res) => {
    pirInstance.retrievePirList().then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
};
const retrievePirByPirId = async (req, res) => {
    const pirId = req.query.pirId;
    pirInstance.retrievePirByPirid(pirId).then((pir) => {
        res.status(200).send(pir);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
};
const leaveThePirFromTheGroup = async (req, res) => {
    const pir = req.body.pir;
    pirInstance.leaveThePirFromTheGroup(pir).then((ress) => {
        res.status(200).send(ress);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
};
exports.default = { createPir, createChapter, retrieveChaptersByEditorId, updateChapter, updatePir, createWordPair, updateWordPair, deletePir, retrieveAllWordPairsOfSinglePir, deleteChapter, deleteWordPair, retrieveAllChapters, retrievePirList, assingPirToGroup, retrievePirByPirId, leaveThePirFromTheGroup };
