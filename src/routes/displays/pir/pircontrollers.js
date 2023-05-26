"use strict";
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
const Pir_1 = require("../../../models/Pir");
const pirInstance = new Pir_1.Pir(null, null, null, null, null, [], []);
const retrievePirsNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    pirInstance.retrievePirs().then((dataSnapshot) => __awaiter(void 0, void 0, void 0, function* () {
        const dataArray = Object.values(dataSnapshot.val());
        const newDataArray = yield dataArray.map((data) => {
            return {
                pirId: data.pirId,
                name: data.name
            };
        });
        return res.status(200).send(newDataArray);
    })).catch((error) => {
        return res.status(401).send(error.message);
    });
});
const retrieveChaptersNamesByPirId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pirId = req.query.pirId;
    pirInstance.retrieveChaptersNamesByPirId(pirId).then((pir) => __awaiter(void 0, void 0, void 0, function* () {
        const dataArray = Object.values(pir.val().chapters);
        const newDataArray = yield dataArray.map((data) => {
            return {
                chapterId: data.chapterId,
                chapterName: data.chapterName,
                pirId: data.pirId
            };
        });
        return res.status(200).send(newDataArray);
    })).catch((error) => {
        return res.status(401).send(error.message);
    });
});
const retrieveChaptersByChapterId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chapterId = req.query.chapterId;
    const pirId = req.query.pirId;
    pirInstance.retrieveChapterByChapterId(chapterId, pirId).then((chapter) => __awaiter(void 0, void 0, void 0, function* () {
        return res.status(200).send(chapter);
    })).catch((error) => {
        return res.status(401).send(error.message);
    });
});
exports.default = { retrievePirsNames, retrieveChaptersNamesByPirId, retrieveChaptersByChapterId };
