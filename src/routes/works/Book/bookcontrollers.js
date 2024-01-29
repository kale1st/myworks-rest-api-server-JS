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
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const database_1 = require("firebase/database");
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const db = (0, database_1.getDatabase)();
const createBook = async (req, res) => {
    const book = req.body.book;
    const token = req.headers['authorization'].split(' ')[1];
    try {
        await admin.auth().verifyIdToken(token).then(async (response) => {
            book.bookId = await uuidv1();
            await (0, database_1.set)((0, database_1.ref)(db, 'users/' + response.uid + '/works/books/' + book.bookId), book);
            return await res.send({ book: book });
        }).catch((err) => {
            return res.send({ error: err.message });
        });
    }
    catch (err) {
        return res.send({ error: err.message });
    }
};
const retrieveAllBooks = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }
        const response = await admin.auth().verifyIdToken(token);
        const nodeRef = admin.database().ref('users/' + response.uid + '/works/books/');
        const snapshot = await nodeRef.once('value');
        if (snapshot.exists()) {
            const data = snapshot.val();
            return res.status(200).send(Object.values(data));
        }
        else {
            // Handle the case where the node doesn't exist or is null
            return res.status(404).send({ error: 'Node not found or is null' });
        }
    }
    catch (err) {
        console.error("Error retrieving books:", err);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};
const deleteBook = async (req, res) => {
    try {
        const bookId = req.body.bookId;
        const authorizationHeader = req.headers && req.headers['authorization'];
        if (!authorizationHeader) {
            // Handle the case where the 'authorization' header is missing
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }
        const token = authorizationHeader.split(' ')[1];
        const response = await admin.auth().verifyIdToken(token);
        const ref = admin.database().ref('users/' + response.uid + '/works/books/');
        await ref.child(bookId).remove();
        res.send({ info: 'The book at ' + bookId + ' id has been deleted!' });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
const updateBook = async (req, res) => {
    try {
        const book = req.body.book;
        const authorizationHeader = req.headers && req.headers['authorization'];
        if (!authorizationHeader) {
            // Handle the case where the 'authorization' header is missing
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }
        const token = authorizationHeader.split(' ')[1];
        const response = await admin.auth().verifyIdToken(token);
        const db = admin.database();
        const ref = db.ref('users/' + response.uid + '/works/books/' + book.bookId);
        await ref.update(book);
        res.send({ book: book });
    }
    catch (err) {
        console.error("Error updating data:", err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
exports.default = { createBook, retrieveAllBooks, deleteBook, updateBook };
