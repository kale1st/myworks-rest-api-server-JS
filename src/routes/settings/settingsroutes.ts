import express from 'express';
import settingscontrollers from './settingscontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();
router.use(bodyParser.json());

router.patch('/settings/username', tokenControl, settingscontrollers.updateUserName);

export default router;