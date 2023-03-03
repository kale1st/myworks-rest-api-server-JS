import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { Request, Response } from 'express';
import { Book } from "../../../models/Book";

const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const db = getDatabase();

const createBook = async (req: Request, res: Response) => {

    const book: Book = req.body.book;
    const token = req.body.token;
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
    } catch (err) {
        return res.send(
            { error: err.message }
        );
    }

};
const retrieveAllBooks = async (req: Request, res: Response) => {

    const token = req.headers['authorization'].split(' ')[1];
    await admin.auth().verifyIdToken(token).then(async (response) => {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('users/' + response.uid + '/works/books/');

        // Read the data at the node once
        nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it wxists
                const data = snapshot.val();
                return res.status(200).send(Object.values(data));
            } else {
                // handle the case where the node doesn't exist or is null
            }

        }, (error) => {
            return res.status(404).send(error);
        });
    }).catch((err) => {
        return res.status(401).send(err.message);
    })
}
const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.body.bookId;
    const token = req.body.token;
    await admin.auth().verifyIdToken(token).then(async (response) => {

        const ref = await admin.database().ref('users/' + response.uid + '/works/books/');

        await ref.child(bookId).remove();

        return await res.send(
            { info: 'the book at' + bookId + 'id!' }
        );
    }).catch((err) => {
        console.log(err)
    })
}
const updateBook = async (req: Request, res: Response) => {
    const book = req.body.book;
    const token = req.body.token;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        const db = admin.database();
        const ref = db.ref('users/' + response.uid + '/works/books/' + book.bookId);

        return ref.update(book)
            .then(async () => {
                return await res.send(
                    { book: book }
                );
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });


    }).catch((err) => {
        console.log(err)
    })
}

export default { createBook, retrieveAllBooks, deleteBook, updateBook };