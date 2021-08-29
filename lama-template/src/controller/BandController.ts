import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDataBase } from "../data/BandDataBase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";

export class BandController{
    async createBandController(
        req: Request,
        res: Response
    ){
        try {
            const input: BandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness(
                new BandDataBase,
                new IdGenerator,
                new Authenticator
            );

            const token = await bandBusiness.createBand(input, req.headers.authorization!);

            res.status(200).send({ token });

        } catch (error) {
            res.status(error.customErrorCode || 400).send({ error: error.message });
        }

    }
}