"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usercontrollers_1 = __importDefault(require("./usercontrollers"));
var sigin_1 = __importDefault(require("../../functions/sigin"));
var body_parser_1 = __importDefault(require("body-parser"));
var router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/signin', sigin_1.default.signin);
router.post('/users/adduser', usercontrollers_1.default.addUser);
exports.default = router;
