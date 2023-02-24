import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { Request, Response } from 'express';
import { Book } from "../../../models/Book";
const { v1: uuidv1, v4: uuidv4 } = require('uuid');


const db = getDatabase();
const createBook = async (req: Request, res: Response) => {

    const book: Book = req.body.book;
    const token = req.body.token;
    console.log(book)
    await admin.auth().verifyIdToken(token).then(async (response) => {
        await set(
            ref(db, 'users/' + response.uid + '/works/books/' + uuidv1()), book);
        return await res.send(
            { book: book }
        );
    })
};

export default { createBook };