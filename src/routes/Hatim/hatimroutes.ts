import express from 'express';
import hatimcontroller from './hatimcontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';
import chechkRole from '../../functions/checkRole';

const router = express.Router();

router.use(bodyParser.json());
router.post('/hatim/create', chechkRole, hatimcontroller.createHatim);
router.get('/hatim/retrieve', tokenControl, hatimcontroller.retrieveHatim);
router.get('/hatim/retrievesinglecuz', tokenControl, hatimcontroller.getSingleCuz);
router.delete('/hatim/delete', tokenControl, hatimcontroller.deleteHatim);
router.patch('/hatim/update', tokenControl, hatimcontroller.updateHatim);
router.get('/hatim/getReaderName', tokenControl, hatimcontroller.getReaderName)
router.get('/hatim/getAnotherReadersName', tokenControl, hatimcontroller.getNameOfAnotherUsers)

export default router;