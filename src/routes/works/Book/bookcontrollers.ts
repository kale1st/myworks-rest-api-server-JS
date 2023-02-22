import * as admin from "firebase-admin";
import { getAuth } from "firebase/auth";
import { Request, Response } from 'express';
import { firebaseApp } from "../../../tools/firebaseTools";
import { Book } from '../../../models/Book'

const auth = getAuth(firebaseApp);
const createBook = async (req: Request, res: Response) => {

    const book = req.body.book;
    const token = req.body.token;

    return await res.send(
        { book: book }
    );


};

export default { createBook };