"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingscontrollers_1 = __importDefault(require("./settingscontrollers"));
const body_parser_1 = __importDefault(require("body-parser"));
const checkTokenExpiration_1 = __importDefault(require("../../functions/checkTokenExpiration"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.patch('/settings/username', checkTokenExpiration_1.default, settingscontrollers_1.default.updateUserName);
exports.default = router;
