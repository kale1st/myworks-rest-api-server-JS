import express from 'express';
import pircontroller from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import chechkRole from '../../../functions/checkRole';
import pircontrollers from './pircontrollers';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', chechkRole, pircontroller.createPir);
router.get('/pir/getpirs', tokenControl, pircontroller.retrievePirs)
router.patch('/pir/updatepir', tokenControl, pircontrollers.updatePir)

router.post('/pir/addchapter', tokenControl, pircontroller.createChapter);
router.get('/pir/getchaptersbyeditorid', tokenControl, pircontrollers.retrieveChaptersByEditorId)
router.patch('/pir/updatechapter', tokenControl, pircontrollers.updateChapter)

router.post('/pir/createeditedwordpair', tokenControl, pircontrollers.createWordPair)
router.patch('/pir/updatewordpair', tokenControl, pircontroller.updateWordPair)

export default router;