import express from 'express';
import pircontroller from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import chechkRole from '../../../functions/checkRole';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', chechkRole, pircontroller.createPir);
router.post('/pir/addchapter', tokenControl, pircontroller.addChapter);
router.get('/pir/getpirsbyeditorid', tokenControl, pircontroller.retrievePirsByEditorId)


export default router;