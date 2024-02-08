import express from 'express';
import pircontrollers from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', tokenControl, pircontrollers.createPir);
// router.get('/pir/getpirs', tokenControl, pircontrollers.retrievePirs)
router.patch('/pir/updatepir', tokenControl, pircontrollers.updatePir)
router.delete('/pir/deletepir', tokenControl, pircontrollers.deletePir)

router.post('/pir/addchapter', tokenControl, pircontrollers.createChapter);
router.get('/pir/getchaptersbyeditorid', pircontrollers.retrieveChaptersByEditorId)
router.get('/pir/getallchapters', pircontrollers.retrieveAllChapters)
router.patch('/pir/updatechapter', tokenControl, pircontrollers.updateChapter)
router.delete('/pir/deletechapter', tokenControl, pircontrollers.deleteChapter)

router.post('/pir/createeditedwordpair', tokenControl, pircontrollers.createWordPair)
router.patch('/pir/updatewordpair', tokenControl, pircontrollers.updateWordPair)
router.get('/pir/getallwordpairsofsinglepir', pircontrollers.retrieveAllWordPairsOfSinglePir)
router.delete('/pir/deletewordpair', tokenControl, pircontrollers.deleteWordPair)

router.get('/pir/retrievepirlist', pircontrollers.retrievePirList)
router.post('/pir/assignpirtogroup', tokenControl, pircontrollers.assingPirToGroup)
router.get('/pir/retrievepirbypirid', pircontrollers.retrievePirByPirId)
router.patch('/pir/leavepirfromgroup', tokenControl, pircontrollers.leaveThePirFromTheGroup)

export default router;