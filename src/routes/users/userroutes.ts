import express from 'express';
import usercontroller from './usercontrollers';
import signin from '../../functions/sigin';
const router = express.Router();

router.post('/signin', signin.signin);
router.post('/users/create', usercontroller.createUser);

export default router
