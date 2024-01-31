"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pircontrollers_1 = __importDefault(require("./pircontrollers"));
const body_parser_1 = __importDefault(require("body-parser"));
const checkTokenExpiration_1 = __importDefault(require("../../../functions/checkTokenExpiration"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/pir/create', checkTokenExpiration_1.default, pircontrollers_1.default.createPir);
// router.get('/pir/getpirs', tokenControl, pircontrollers.retrievePirs)
router.patch('/pir/updatepir', checkTokenExpiration_1.default, pircontrollers_1.default.updatePir);
router.delete('/pir/deletepir', checkTokenExpiration_1.default, pircontrollers_1.default.deletePir);
router.post('/pir/addchapter', checkTokenExpiration_1.default, pircontrollers_1.default.createChapter);
router.get('/pir/getchaptersbyeditorid', pircontrollers_1.default.retrieveChaptersByEditorId);
router.get('/pir/getallchapters', pircontrollers_1.default.retrieveAllChapters);
router.patch('/pir/updatechapter', checkTokenExpiration_1.default, pircontrollers_1.default.updateChapter);
router.delete('/pir/deletechapter', checkTokenExpiration_1.default, pircontrollers_1.default.deleteChapter);
router.post('/pir/createeditedwordpair', checkTokenExpiration_1.default, pircontrollers_1.default.createWordPair);
router.patch('/pir/updatewordpair', checkTokenExpiration_1.default, pircontrollers_1.default.updateWordPair);
router.get('/pir/getallwordpairsofsinglepir', pircontrollers_1.default.retrieveAllWordPairsOfSinglePir);
router.delete('/pir/deletewordpair', checkTokenExpiration_1.default, pircontrollers_1.default.deleteWordPair);
router.get('/pir/retrievepirlist', pircontrollers_1.default.retrievePirList);
router.post('/pir/assignpirtogroup', checkTokenExpiration_1.default, pircontrollers_1.default.assingPirToGroup);
router.get('/pir/retrievepirbypirid', pircontrollers_1.default.retrievePirByPirId);
router.patch('/pir/leavepirfromgroup', checkTokenExpiration_1.default, pircontrollers_1.default.leaveThePirFromTheGroup);
exports.default = router;
