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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const firebaseTools_1 = require("../tools/firebaseTools");
const admin = __importStar(require("firebase-admin"));
const auth = (0, auth_1.getAuth)(firebaseTools_1.firebaseApp);
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password)
        .then((userCredential) => __awaiter(void 0, void 0, void 0, function* () {
        // Signed in 
        if (userCredential.user) {
            const user = yield userCredential.user;
            //getting token from Fire-Auth
            yield user.getIdToken()
                .then((idToken) => {
                // Send the ID token to the server for authentication
                admin.auth()
                    .verifyIdToken(idToken)
                    .then((decodedToken) => {
                    // Token is valid.   
                    return res.send({
                        "status": 200,
                        "message": "Success",
                        "token": idToken,
                        'uid': decodedToken.user_id,
                        'displayName': user.providerData[0].displayName,
                        'photoURL': user.providerData[0].photoURL,
                        roles: decodedToken.roles
                    });
                })
                    .catch((err) => {
                    return res.status(401).send(err.message);
                });
            })
                .catch((error) => {
                return res.send({
                    'error': error.message,
                    'status': 404
                });
            });
        }
    }))
        .catch((error) => {
        return res.send({ 'error': error.message, 'status': 404 });
    });
});
exports.default = { signin };
