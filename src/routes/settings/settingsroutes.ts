import express from 'express';
import settingscontrollers from './settingscontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();
router.use(bodyParser.json());

router.get('/settings/getuserinfo', tokenControl, settingscontrollers.getUserInfo)
router.patch('/settings/username', tokenControl, settingscontrollers.updateUserInfo);

export default router;