import express from 'express';
import bodyParser from 'body-parser';
import generalcontrollers from './generalcontrollers';

const router = express.Router();

router.use(bodyParser.json());
router.get('/general/tokenexpiringcontrol', generalcontrollers.controlTokenExpired);

export default router;