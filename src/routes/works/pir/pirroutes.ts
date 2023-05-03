import express from 'express';
import pircontrollers from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import chechkRole from '../../../functions/checkRole';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', chechkRole, pircontrollers.createPir);
router.get('/pir/getpirs', tokenControl, pircontrollers.retrievePirs)
router.patch('/pir/updatepir', tokenControl, pircontrollers.updatePir)

router.post('/pir/addchapter', tokenControl, pircontrollers.createChapter);
router.get('/pir/getchaptersbyeditorid', tokenControl, pircontrollers.retrieveChaptersByEditorId)
router.patch('/pir/updatechapter', tokenControl, pircontrollers.updateChapter)

router.post('/pir/createeditedwordpair', tokenControl, pircontrollers.createWordPair)
router.patch('/pir/updatewordpair', tokenControl, pircontrollers.updateWordPair)
router.delete('/pir/deletepir', tokenControl, pircontrollers.deletePir)

export default router;