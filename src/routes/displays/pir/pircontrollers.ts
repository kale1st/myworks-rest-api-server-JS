import { Request, Response } from 'express';
import { Pir } from '../../../models/Pir';
import { Chapter } from '../../../models/Chapter';

const pirInstance = new Pir(null, null, null, null, null)

const retrievePirsNames = async (req: Request, res: Response) => {

    pirInstance.retrievePirs().then(async (dataSnapshot) => {
        const dataArray = Object.values(dataSnapshot.val());

        const newDataArray = await dataArray.map((data: Pir) => {
            return {
                pirId: data.pirId,
                name: data.name
            };
        });
        return res.status(200).send(newDataArray)
    }).catch((error) => {
        return res.status(401).send(error.message);

    });


}

const retrieveChaptersNamesByPirId = async (req: Request, res: Response) => {
    const pirId = req.query.pirId;
    pirInstance.retrieveChaptersNamesByPirId(pirId).then(async (pir) => {
        const dataArray = Object.values(pir.val().chapters);

        const newDataArray = await dataArray.map((data: Chapter) => {
            return {
                chapterId: data.chapterId,
                chapterName: data.chapterName
            };
        });
        return res.status(200).send(newDataArray)
    }).catch((error) => {
        return res.status(401).send(error.message);
    });
}

const retrieveChaptersByChapterId = async (req: Request, res: Response) => {
    const chapterId = req.query.chapterId;
    const pirId = req.query.pirId;
    pirInstance.retrieveChapterByChapterId(chapterId, pirId).then(async (chapter) => {
        return res.status(200).send(chapter)
    }).catch((error) => {
        return res.status(401).send(error.message);
    });
}
export default { retrievePirsNames, retrieveChaptersNamesByPirId, retrieveChaptersByChapterId }