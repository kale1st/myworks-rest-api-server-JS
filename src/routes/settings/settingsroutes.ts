import express from 'express';
import settingscontrollers from './settingscontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();
router.use(bodyParser.json());

router.get('/settings/getuserinfo', tokenControl, settingscontrollers.getUserInfo)
router.patch('/settings/updateuser', tokenControl, settingscontrollers.updateUser);
router.patch('/settings/updateuserpassword', tokenControl, settingscontrollers.updateUserPassword);

export default router;