import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import { Pir } from '../../../models/Pir';
import { Chapter } from '../../../models/Chapter';
import { WordPair } from '../../../models/WordPair';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

const pirInstance = new Pir(null, null, null, null, '', [], [], '')
const wordPairInstance = new WordPair('', '', null, null, null)

const createPir = async (req: Request, res: Response) => {
    let newPir: Pir = req.body.pir;

    if (newPir.pirId === null) {
        newPir.pirId = await uuidv1();
    }

    await pirInstance.createPir(newPir).then(() => {
        res.status(200).send(newPir);
    }).catch((err) => {
        return res.status(409).send(
            { error: err.message }
        );
    })
}

const assingPirToGroup = async (req: Request, res: Response) => {
    const { pirinfo, groupId } = req.body
    pirInstance.assignPirToGroup(pirinfo, groupId).then((pir) => {
        res.status(200).send({ response: pir + ' added' })
    }).catch((error) => {
        res.status(401).send(
            { error: error.message }
        )
    })

}

// const retrievePirs = async (req: Request, res: Response) => {
//     const pirEditorId = req.query.pirEditorId;
//     pirInstance.retrievePirsByPirEditorId(pirEditorId).then((pirs) => {
//         return res.status(200).send(pirs)
//     })
// }

const createChapter = async (req: Request, res: Response) => {
    const chapter: Chapter = req.body.chapter;
    chapter.chapterId = uuidv1();
    pirInstance.addChapterToPir(chapter).then(() => {
        res.status(200).send(chapter);
    }).catch((err) => {
        return res.status(409).send(
            { error: err.message }
        );
    })
}

const retrieveChaptersByEditorId = async (req: Request, res: Response) => {
    try {
        const editorId: any = req.query.editorId;
        const pirId: any = req.query.pirId;

        const pirs = await pirInstance.retrievePirs();

        const selectedPir: Pir | undefined = Object.values<Pir>(pirs.val()).find((pir: Pir) => pir.pirId === pirId);

        if (!selectedPir) {
            return res.status(404).send({ error: 'Selected pir not found' });
        }

        const chapters = Object.values<Chapter>(selectedPir.chapters).filter((chapter: Chapter) =>
            chapter.editorId === editorId
        );

        return res.status(200).send(chapters);
    } catch (error: any) {
        return res.status(401).send({ error: error.message });
    }
};



const retrieveAllChapters = async (req: Request, res: Response) => {
    try {
        const pirId: any = req.query.pirId;

        const pirs = await pirInstance.retrievePirs();
        const selectedPir: Pir | undefined = Object.values<Pir>(pirs.val()).find((pir: Pir) => pir.pirId === pirId);

        if (!selectedPir) {
            return res.status(404).send({ error: 'Selected pir not found' });
        }

        const chapters = selectedPir.chapters;
        return res.status(200).send(chapters);
    } catch (error: any) {
        return res.status(401).send({ error: error.message });
    }
};


const updateChapter = async (req: Request, res: Response) => {
    const chapter: Chapter = req.body.chapter;
    pirInstance.updateChapter(chapter).then((updatedChapter) => {
        return res.status(200).send(updatedChapter)
    })


}

const updatePir = async (req: Request, res: Response) => {
    const pir: Pir = req.body.pir;
    pirInstance.updatePir(pir).then((updatedPir) => {
        return res.status(200).send(updatedPir)
    })
}

const createWordPair = async (req: Request, res: Response) => {
    const wordpair: WordPair = req.body.wordpair;
    await wordPairInstance.createWordPair(wordpair)
    return res.status(200).send(wordpair)

}

const updateWordPair = async (req: Request, res: Response) => {
    try {
        const wordPair: WordPair = req.body.wordPair;
        const token = req.headers?.['authorization']?.split(' ')[1]; // Check if headers is defined

        if (!token) {
            return res.status(401).send({ error: 'Authorization token not provided' });
        }

        const response = await admin.auth().verifyIdToken(token);

        const updatedWordPair = await wordPairInstance.updateWordPair(wordPair);

        return res.status(200).send(updatedWordPair);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};


const deletePir = async (req: Request, res: Response) => {
    const pirId = req.body.pirId;
    // pirInstance.deletePir(pirId).then(() => {
    //     return res.status(200).send(
    //         { info: 'the book at' + pirId + 'id! deleted' }
    //     );
    // })


}

const retrieveAllWordPairsOfSinglePir = async (req: Request, res: Response) => {
    const pirId = req.query.pirId;
    wordPairInstance.retrieveAllWordPairsOfSinglePir(pirId).then((data: any) => {
        res.status(200).send(data)
    }).catch((error) => {
        return res.status(401).send({ error: error.message });
    })
}

const deleteChapter = async (req: Request, res: Response) => {
    const pirId = req.body.pirId;
    const chapterId = req.body.chapterId;
    pirInstance.deleteChapter(pirId, chapterId).then(() => {
        return res.status(200).send(
            { info: 'the chapter at' + pirId + 'id! deleted' }
        );
    })

}

const deleteWordPair = async (req: Request, res: Response) => {
    const wordPair = req.body.wordPair;
    wordPairInstance.deleteWordPair(wordPair).then((ress) => {
        return res.status(200).send(
            { info: wordPair.word + ' deleted' }
        );
    })
}

const retrievePirList = async (req: Request, res: Response) => {
    pirInstance.retrievePirList().then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        res.status(200).send({ error: error.message })
    })
}

const retrievePirByPirId = async (req: Request, res: Response) => {
    const pirId = req.query.pirId;
    pirInstance.retrievePirByPirid(pirId).then((pir: any) => {
        res.status(200).send(pir)
    }).catch((error) => {
        res.status(200).send({ error: error.message })
    })
}

const leaveThePirFromTheGroup = async (req: Request, res: Response) => {
    const pir = req.body.pir
    pirInstance.leaveThePirFromTheGroup(pir).then((ress: any) => {
        res.status(200).send(ress)
    }).catch((error) => {
        res.status(200).send({ error: error.message })
    })
}
export default { createPir, createChapter, retrieveChaptersByEditorId, updateChapter, updatePir, createWordPair, updateWordPair, deletePir, retrieveAllWordPairsOfSinglePir, deleteChapter, deleteWordPair, retrieveAllChapters, retrievePirList, assingPirToGroup, retrievePirByPirId, leaveThePirFromTheGroup }