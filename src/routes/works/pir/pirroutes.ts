import express from 'express';
import pircontroller from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import chechkRole from '../../../functions/checkRole';
import pircontrollers from './pircontrollers';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', chechkRole, pircontroller.createPir);
router.post('/pir/addchapter', tokenControl, pircontroller.createChapter);
router.get('/pir/getpirs', tokenControl, pircontroller.retrievePirs)
router.get('/pir/getchaptersbyeditorid', tokenControl, pircontrollers.retrieveChaptersByEditorId)

export default router;