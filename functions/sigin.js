"use strict";
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
                return res.send({
                    "status": 200,
                    "message": "Success",
                    "token": idToken,
                    'uid': user.uid,
                    'displayName': user.providerData[0].displayName
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
