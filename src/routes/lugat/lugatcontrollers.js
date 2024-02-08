"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getWordOfMeaning = async (req, res) => {
    var _a;
    try {
        const word = req.query.word;
        if (!word) {
            return res
                .status(400)
                .send({ error: 'Missing "word" parameter in the query.' });
        }
        const response = await axios_1.default.get(`https://lugat.osmanlica.online/?kelime=${word}&kaynak=browser&sadecehattikuran=false&filitre=Luggat,arap%C3%A7a%20kelimeler&manadaara=false&json=True`);
        if ((_a = response.data) !== null && _a !== void 0 ? _a : false) {
            res.send(response.data);
        }
        else {
            console.log(`${word} kelimesinin anlamı bulunamadı`);
            res.status(404).send({ error: "Word not found" });
        }
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
exports.default = { getWordOfMeaning };
