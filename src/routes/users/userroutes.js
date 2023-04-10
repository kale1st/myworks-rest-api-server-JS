"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontrollers_1 = __importDefault(require("./usercontrollers"));
const sigin_1 = __importDefault(require("../../functions/sigin"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/signin', sigin_1.default.signin);
router.post('/users/createuser', usercontrollers_1.default.createUser);
router.get('/users/getUserById', usercontrollers_1.default.getUserById);
exports.default = router;
