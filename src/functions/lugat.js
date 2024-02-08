"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lugat = void 0;
const axios_1 = __importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const text = "Öyle ki, bu engin hazlarla coşan namaz kahramanı, doyma bilmeyen bir hisle, kemmiyet ve keyfiyet sınırlarının üstünde, niyetle derinleştirip sonsuzlaştırdığı; yakîniyle Hak’la irtibatlandırıp hulûsuyla ebedîleştirdiği, mal, can ve bütün ilâhî mevhibeler adına Hakk’a karşı minnet borcunu edaya yönelir; gönlünün bütün duyarlılığıyla Allah’ı anar ve inler.. Nebî’yi yâd eder, içi inşirahla dolar.. kendisiyle aynı mutluluğu paylaşan insanları düşünür, hayır dualarıyla gürler.. ve tekbirlerle başlattığı bu miraç yolculuğunu, dinin temeli sayılan şehadetlerle noktalar";
const lugat = async (req, res) => {
    const words = text.split(" ");
    let arr = [];
    (0, rxjs_1.interval)(3000)
        .pipe((0, operators_1.take)(words.length))
        .subscribe((index) => {
        const word = words[index];
        console.log(word);
        axios_1.default
            .get("https://lugat.osmanlica.online/?kelime=" +
            word +
            "&kaynak=browser&sadecehattikuran=false&filitre=%C4%B0sam&manadaara=false&json=True")
            .then((response) => {
            var _a;
            if ((_a = response.data) !== null && _a !== void 0 ? _a : false) {
                arr.push(response.data);
                console.log(response.data);
                const filePath = "file.txt";
                const dataString = response.data.join("\n");
                console.log(response.data);
                // Append data to the file
                // fs.appendFileSync(filePath, dataString + "\n");
            }
            else {
                console.log(word + " kelimesinin anlamı bulunamadı");
            }
        })
            .catch((error) => {
            console.error(`Error: ${error.message}`);
        });
    });
};
exports.lugat = lugat;
