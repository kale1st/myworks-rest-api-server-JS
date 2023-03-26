import express from 'express';
import hatimcontroller from './hatimcontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.post('/hatim/create', tokenControl, hatimcontroller.createHatim);
router.get('/hatim/retrieve', tokenControl, hatimcontroller.retrieveHatim);
router.delete('/hatim/delete', tokenControl, hatimcontroller.deleteHatim);
router.patch('/hatim/update', tokenControl, hatimcontroller.updateHatim);

export default router;