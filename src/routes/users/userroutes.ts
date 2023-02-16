import express from 'express';
import usercontroller from './usercontrollers';
import signin from '../../functions/sigin';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.post('/signin', signin.signin);
router.post('/users/create', usercontroller.createUser);

export default router
