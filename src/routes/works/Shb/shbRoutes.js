"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const checkTokenExpiration_1 = __importDefault(require("../../../functions/checkTokenExpiration"));
const shbControllers_1 = __importDefault(require("./shbControllers"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/shb/create', checkTokenExpiration_1.default, shbControllers_1.default.createShb);
exports.default = router;
