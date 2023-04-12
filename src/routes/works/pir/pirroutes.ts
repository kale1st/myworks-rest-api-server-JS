import express from 'express';
import pircontroller from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import chechkRole from '../../../functions/checkRole';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', chechkRole, pircontroller.createPir);
router.get('/pir/retrieve', tokenControl, pircontroller.retrievePirs);


export default router;