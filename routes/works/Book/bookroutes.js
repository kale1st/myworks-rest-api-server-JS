"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookcontrollers_1 = __importDefault(require("./bookcontrollers"));
const body_parser_1 = __importDefault(require("body-parser"));
const checkTokenExpiration_1 = __importDefault(require("../../../functions/checkTokenExpiration"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/book/create', checkTokenExpiration_1.default, bookcontrollers_1.default.createBook);
router.get('/book/retrieve', checkTokenExpiration_1.default, bookcontrollers_1.default.retrieveAllBooks);
router.delete('/book/delete', checkTokenExpiration_1.default, bookcontrollers_1.default.deleteBook);
router.patch('/book/update', checkTokenExpiration_1.default, bookcontrollers_1.default.updateBook);
exports.default = router;
