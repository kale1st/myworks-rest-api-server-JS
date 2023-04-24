import express from 'express';
import pircontroller from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.get('/display/retrievepirs', pircontroller.retrievePirsNames)


export default router;