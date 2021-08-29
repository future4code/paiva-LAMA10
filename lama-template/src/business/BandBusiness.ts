import { Band, BandInputDTO } from './../model/Band';
import { Authenticator } from '../services/Authenticator';
import { BandDataBase } from './../data/BandDataBase';
import { IdGenerator } from './../services/IdGenerator';
import { UserRole } from '../model/User';
import { UnauthorizedError } from '../error/UnauthorizedError';
import { InputError } from '../error/InputError';


export class BandBusiness{

    constructor (
        private bandDataBase: BandDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async createBand (input: BandInputDTO, token: string){
        
        const tokenData = this.authenticator.getData(token)

        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError ("Esse usuário não possue autorização de administrador.")
        }

        if(!input.name || !input.musicGenre || !input.responsible){
            throw new InputError("Preencha todos os campos para registro da banda.")
        }

        await this.bandDataBase.createBand(
            Band.toBandModel({
                ...input,
                id: this.idGenerator.generate()
            })
        )

    }
        
}