import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { Pir } from '../../../models/Pir';
import { Chapter } from '../../../models/Chapter';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

const pirInstance = new Pir(null, null, null, null)
const createPir = async (req: Request, res: Response) => {
    let newPir: Pir = req.body.pir;
    newPir.pirId = await uuidv1();
    newPir.chapters[0].chapterId = await uuidv1(); // first chapter
    const token = req.body.token;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        try {
            console.log(newPir);
            await pirInstance.createPir(newPir).then(() => {
                res.status(200).send(newPir);
            }).catch((err) => {
                return res.status(409).send(
                    { error: err.message }
                );
            })
        } catch (err) {
            return res.status(409).send(
                { error: err.message }
            );
        }
    }).catch((err) => {
        return res.status(401).send(
            { error: err.message }
        );
    })
}

const addChapter = async (req: Request, res: Response) => {
    const chapter: Chapter = req.body.chapter;
    chapter.chapterId = uuidv1();
    const token = req.body.token;
    await admin.auth().verifyIdToken(token).then(async (response) => {
        try {
            console.log(chapter)
            // pirInstance.addChapterToPir(chapter).then(() => {
            //     res.status(200).send(chapter);
            // }).catch((err) => {
            //     return res.status(409).send(
            //         { error: err.message }
            //     );
            // })
        } catch (err) {
            return res.status(409).send(
                { error: err.message }
            );
        }
    }).catch((err) => {
        return res.status(401).send(
            { error: err.message }
        );
    })
}

const retrievePirsByEditorId = async (req: Request, res: Response) => {
    const editorId: number | any = req.query.editorId;
    pirInstance.retrievePirs().then((pirs) => {
        return res.status(200).send(pirs)
    })
}

export default { createPir, addChapter, retrievePirsByEditorId }