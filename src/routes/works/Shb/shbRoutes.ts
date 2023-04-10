import express from 'express';
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import shbControllers from './shbControllers';

const router = express.Router();

router.use(bodyParser.json());
router.post('/shb/create', tokenControl, shbControllers.createShb);


export default router