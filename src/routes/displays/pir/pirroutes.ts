import express from 'express';
import pircontrollers from './pircontrollers'
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.get('/display/retrievepirs', pircontrollers.retrievePirsNames)
router.get('/display/retrievechaptersbypirid', pircontrollers.retrieveChaptersNamesByPirId)
router.get('/display/retrievechapterbychapterid', pircontrollers.retrieveChaptersByChapterId)

export default router;