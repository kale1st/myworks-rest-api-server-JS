import express from 'express';
import bookcontroller from './bookcontrollers';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.post('/book/createbook', bookcontroller.createBook);

export default router