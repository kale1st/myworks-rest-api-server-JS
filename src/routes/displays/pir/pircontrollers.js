"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pir_1 = require("../../../models/Pir");
const pirInstance = new Pir_1.Pir(null, null, null, null, '', [], []);
const retrievePirsNames = async (req, res) => {
    pirInstance.retrievePirs().then(async (dataSnapshot) => {
        const dataArray = Object.values(dataSnapshot.val());
        const newDataArray = await dataArray.map((data) => {
            return {
                pirId: data.pirId,
                name: data.name
            };
        });
        return res.status(200).send(newDataArray);
    }).catch((error) => {
        return res.send(error.message);
    });
};
const retrieveChaptersNamesByPirId = async (req, res) => {
    const pirId = req.query.pirId;
    pirInstance.retrieveChaptersNamesByPirId(pirId).then(async (pir) => {
        const dataArray = Object.values(pir.val().chapters);
        const newDataArray = await dataArray.map((data) => {
            return {
                chapterId: data.chapterId,
                chapterName: data.chapterName,
                pirId: data.pirId
            };
        });
        return res.status(200).send(newDataArray);
    }).catch((error) => {
        return res.status(401).send(error.message);
    });
};
const retrieveChaptersByChapterId = async (req, res) => {
    const chapterId = req.query.chapterId;
    const pirId = req.query.pirId;
    pirInstance.retrieveChapterByChapterId(chapterId, pirId).then(async (chapter) => {
        return res.status(200).send(chapter);
    }).catch((error) => {
        return res.status(401).send(error.message);
    });
};
exports.default = { retrievePirsNames, retrieveChaptersNamesByPirId, retrieveChaptersByChapterId };
