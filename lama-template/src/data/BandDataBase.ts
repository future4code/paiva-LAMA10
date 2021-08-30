import { NotFoundError } from "../error/NotFoundError";
import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDataBase extends BaseDatabase{

    private static TABLE_NAME = "TABELA_BANDAS_LAMA";

    public async createBand(band: Band): Promise<void>{
        try {
            
            await this.getConnection().insert({
                id: band.getId(),
                name: band.getName(),
                music_Genre: band.getMusicGenre(),
                responsible: band.getResponsible()
            })
            .into(BandDataBase.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
        
    }

    public async getBandIdOrName(input: string): Promise<Band>{
        const result = await this.getConnection()
        .select("*").from(BandDataBase.TABLE_NAME)
        .where({id: input}).orWhere({name: input});

        if(!result[0]){
            throw new NotFoundError(`Não tem nenhuma banda com esse ${input}`)
        }

        return Band.toBandModel(result[0])
    }
}