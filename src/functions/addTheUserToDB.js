"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTheUserToDB = void 0;
const database_1 = require("firebase/database");
const addTheUserToDB = async (req, res) => {
    (userId, name, email, imageUrl) => {
        const db = (0, database_1.getDatabase)();
        (0, database_1.set)((0, database_1.ref)(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    };
};
exports.addTheUserToDB = addTheUserToDB;
