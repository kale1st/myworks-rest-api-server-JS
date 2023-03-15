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
const admin = __importStar(require("firebase-admin"));
const database_1 = require("firebase/database");
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const db = (0, database_1.getDatabase)();
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body.book;
    const token = req.body.token;
    try {
        yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            book.bookId = yield uuidv1();
            yield (0, database_1.set)((0, database_1.ref)(db, 'users/' + response.uid + '/works/books/' + book.bookId), book);
            return yield res.send({ book: book });
        })).catch((err) => {
            return res.send({ error: err.message });
        });
    }
    catch (err) {
        return res.send({ error: err.message });
    }
});
const retrieveAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'].split(' ')[1];
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('users/' + response.uid + '/works/books/');
        // Read the data at the node once
        nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it wxists
                const data = snapshot.val();
                return res.status(200).send(Object.values(data));
            }
            else {
                // handle the case where the node doesn't exist or is null
            }
        }, (error) => {
            return res.status(404).send(error);
        });
    })).catch((err) => {
        return res.status(401).send(err.message);
    });
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.body.bookId;
    const token = req.body.token;
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const ref = yield admin.database().ref('users/' + response.uid + '/works/books/');
        yield ref.child(bookId).remove();
        return yield res.send({ info: 'the book at' + bookId + 'id!' });
    })).catch((err) => {
        console.log(err);
    });
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body.book;
    const token = req.body.token;
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const db = admin.database();
        const ref = db.ref('users/' + response.uid + '/works/books/' + book.bookId);
        return ref.update(book)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield res.send({ book: book });
        }))
            .catch((error) => {
            console.error("Error updating data:", error);
        });
    })).catch((err) => {
        console.log(err);
    });
});
exports.default = { createBook, retrieveAllBooks, deleteBook, updateBook };
