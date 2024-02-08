import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { Request, Response } from 'express';
import { Book } from "../../../models/Book";
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const db = getDatabase();

const createBook = async (req: Request | any, res: Response | any) => {

    const book: Book = req.body.book;
    const token = req.headers['authorization'].split(' ')[1];
    try {
        await admin.auth().verifyIdToken(token).then(async (response) => {
            book.bookId = await uuidv1()
            await set(
                ref(db, 'users/' + response.uid + '/works/books/' + book.bookId), book);
            return await res.send(
                { book: book }
            );
        }).catch((err) => {
            return res.send(
                { error: err.message }
            );
        })
    } catch (err: any) {
        return res.send(
            { error: err.message }
        );
    }

};
const retrieveAllBooks = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Missing Authorization Header' });
        }

        const response = await admin.auth().verifyIdToken(token);
        const nodeRef = admin.database().ref('users/' + response.uid + '/works/books/');

        const snapshot = await nodeRef.once('value');
        if (snapshot.exists()) {
            const data = snapshot.val();
            return res.status(200).send(Object.values(data));
        } else {
            // Handle the case where the node doesn't exist or is null
            return res.status(404).send({ error: 'Node not found or is null' });
        }
    } catch (err) {
        console.error("Error retrieving books:", err);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const deleteBook = async (req: Request, res: Response) => {
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
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const updateBook = async (req: Request, res: Response) => {
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
    } catch (err) {
        console.error("Error updating data:", err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export default { createBook, retrieveAllBooks, deleteBook, updateBook };