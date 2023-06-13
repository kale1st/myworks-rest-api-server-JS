"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const yaml = __importStar(require("js-yaml"));
const fs = __importStar(require("fs"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const usersYamlFilePath = require('path').resolve(__dirname, './src/routes/users/users.yaml');
const usersSpec = yaml.load(fs.readFileSync(usersYamlFilePath, 'utf8'));
const swaggerOptions = {
    definition: Object.assign({ info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'My Works Library API',
            termsOfService: '',
            contact: {
                name: 'API Support',
                url: '',
                email: '',
            },
        }, servers: [
            {
                url: 'http://localhost:3000',
                description: 'My Works API Documentation',
            },
        ], security: [{ bearerAuth: [] }], components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        } }, usersSpec),
    apis: ['./src/routes/users/userroutes.ts']
};
exports.specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
