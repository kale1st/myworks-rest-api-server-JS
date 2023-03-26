"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageJsonCompiling = void 0;
const fs = require('fs');
const packageJsonCompiling = () => {
    // Read the contents of package.json
    const packageJson = JSON.parse(fs.readFileSync('../../dist/package.json'));
    // Update the start command
    packageJson.scripts.start = 'node server.js';
    // Write the updated package.json back to disk
    fs.writeFileSync('../../package.json', JSON.stringify(packageJson, null, 2));
};
exports.packageJsonCompiling = packageJsonCompiling;
