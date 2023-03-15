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
exports.addTheUserToDB = void 0;
const database_1 = require("firebase/database");
const addTheUserToDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (userId, name, email, imageUrl) => {
        const db = (0, database_1.getDatabase)();
        (0, database_1.set)((0, database_1.ref)(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    };
});
exports.addTheUserToDB = addTheUserToDB;
