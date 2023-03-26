import express from 'express';
import functionscontroller from './functionscontroleres'
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.get('/func/getuserinfo', tokenControl, functionscontroller.getUserInfo);


export default router;