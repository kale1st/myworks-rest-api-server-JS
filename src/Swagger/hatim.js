"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hatim = void 0;
const yaml = require('js-yaml');
const fs = require('fs');
const hatim = () => {
    try {
        const config = yaml.safeLoad(fs.readFileSync('first.yml', 'utf8'));
        const indentedJson = JSON.stringify(config, null, 4);
        console.log(indentedJson);
    }
    catch (e) {
        console.log(e);
    }
};
exports.hatim = hatim;
