"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pircontrollers_1 = __importDefault(require("./pircontrollers"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get('/display/retrievepirs', pircontrollers_1.default.retrievePirsNames);
router.get('/display/retrievechaptersbypirid', pircontrollers_1.default.retrieveChaptersNamesByPirId);
router.get('/display/retrievechapterbychapterid', pircontrollers_1.default.retrieveChaptersByChapterId);
exports.default = router;
