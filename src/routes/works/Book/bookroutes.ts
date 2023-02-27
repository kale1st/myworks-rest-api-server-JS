import express from 'express';
import bookcontroller from './bookcontrollers';
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.post('/book/createbook', tokenControl, bookcontroller.createBook);
router.get('/book/retrieve', tokenControl, bookcontroller.retrieveAllBooks);
router.delete('/book/delete', tokenControl, bookcontroller.deleteBook);

export default router