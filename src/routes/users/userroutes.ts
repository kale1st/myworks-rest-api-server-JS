import express from 'express';
import usercontroller from './usercontrollers';
import signin from '../../functions/sigin';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.post('/signin', signin.signin);
router.post('/users/createuser', usercontroller.createUser);
router.get('/users/getUserById', usercontroller.getUserById);

export default router
