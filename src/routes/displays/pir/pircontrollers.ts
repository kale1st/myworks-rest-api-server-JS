import { Request, Response } from 'express';
import { Pir } from '../../../models/Pir';

const pirInstance = new Pir(null, null, null, null, null, null)

const retrievePirsNames = async (req: Request, res: Response) => {

    pirInstance.retrievePirs().then(async (dataSnapshot) => {
        const dataArray = Object.values(dataSnapshot.val());

        const newDataArray = await dataArray.map((data: Pir) => {
            return {
                pirId: data.pirId,
                name: data.name
            };
        });
        return res.status(200).send(newDataArray)
    }).catch((error) => {
        return res.status(401).send(error.message);

    });


}

const retrievePirByPirId = async (req: Request, res: Response) => {
    const pirId = req.query.pirId;
    pirInstance.retrievePirByPirId(pirId).then((pir) => {
        return res.status(200).send(pir)
    }).catch((error) => {
        return res.status(401).send(error.message);
    });
}
export default { retrievePirsNames, retrievePirByPirId }