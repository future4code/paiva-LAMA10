import { Request, Response } from "express";
import { BandInputDTO } from "../model/band";

export class BandController{
    async bandController(
        req: Request,
        res: Response
    ){
        try {
            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const userBusiness = new BandBusiness();
            const token = await bandBusiness.createBand(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

    }
}