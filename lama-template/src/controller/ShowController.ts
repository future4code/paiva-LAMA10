import { ShowInputDTO } from './../model/Show';
import { Request, Response } from "express";
import { Show } from "../model/Show";
import { ShowBusiness } from '../business/ShowBusiness';
import { ShowDataBase } from '../data/ShowDataBase';
import { BandDataBase } from '../data/BandDataBase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { setRandomFallback } from 'bcryptjs';

export class ShowController{
    async createShow(
        req: Request,
        res: Response
    ){
        try {
            const weekDay = Show.toWeekDayEnum(req.body.weekDay);

            const input: ShowInputDTO = {
                weekDay,
                bandId: req.body.bandId,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            }

            const showBusiness = new ShowBusiness(
                new ShowDataBase,
                new BandDataBase,
                new IdGenerator,
                new Authenticator
            )

            const token = req.headers.authorization

            await showBusiness.createShow(input, token!);

            res.sendStatus(200)

        } catch (error) {
            res.status(error.customErrorCode || 400).send({ error: error.message });
        }
    }
}