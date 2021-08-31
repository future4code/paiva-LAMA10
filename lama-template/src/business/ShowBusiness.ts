import { NotFoundError } from './../error/NotFoundError';
import { InputError } from './../error/InputError';
import { UnauthorizedError } from './../error/UnauthorizedError';
import { Authenticator } from './../services/Authenticator';
import { IdGenerator } from './../services/IdGenerator';
import { BandDataBase } from './../data/BandDataBase';
import { ShowDataBase } from './../data/ShowDataBase';
import { Show, ShowInputDTO } from '../model/Show';
import { UserRole } from '../model/User';

export class ShowBusiness{
    constructor(
        private showDataBase: ShowDataBase,
        private bandDataBase: BandDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async createShow(input: ShowInputDTO, token: string){

        const tokenData = this.authenticator.getData(token);

        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("Esse usuário não possue autorização de administrador.")
        }

        if(!input.bandId || !input.weekDay || !input.startTime || !input.endTime){
            throw new InputError("Preencha todos os campos para registro do show.")
        }

        if(input.startTime < 8 || input.startTime > 23 || input.startTime >= input.endTime){
            throw new InputError("O horário informado para este show é inválido. Esse deverá estar entre 8 e 23h e, o horário de inicio deve ser menor que o horário de término.")
        }

        if(!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)){
            throw new InputError("Os shows só podem ser marcados em horários redondos.")
        }

        const band = await this.bandDataBase.getBandIdOrName(input.bandId);

        if(!band){
            throw new NotFoundError("Essa banda não existe.")
        }

        const getShows = await this.showDataBase.getShowsByTimes(input.weekDay, input.startTime, input.endTime)

        if(getShows.length){
            throw new InputError ("Esse horário não está disponível. Já tem show marcado.")
        }

        await this.showDataBase.createShow(
            Show.toShowModel({
                ...input,
                id: this.idGenerator.generate()
            })
        )

    }
}