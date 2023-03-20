import { Request, Response } from 'express';
import { Hatim } from '../../models/Hatim';

const hatim = new Hatim();
const createHatim = async (req: Request, res: Response) => {
    hatim.createHatim();
};
const retrieveHatim = async (req: Request, res: Response) => {


}
const deleteHatim = async (req: Request, res: Response) => {

}
const updateHatim = async (req: Request, res: Response) => {

}

export default { createHatim, retrieveHatim, deleteHatim, updateHatim };