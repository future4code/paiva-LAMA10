import { Band } from "../model/band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDataBase extends BaseDatabase{

    private static TABLE_NAME = "NOME_TABELA_BANDAS";

    public async createBand(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ): Promise<void>{
        try {
            
            await this.getConnection().insert({
                id,
                name,
                music_genre,
                responsible
            })
            .into(BandDataBase.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
        
    }

    public async getBandDetails(id: string): Promise<Band>{
        const result = await this.getConnection()
        .select("*").from(BandDataBase.TABLE_NAME)
        .where({id});

        return Band.toBandModel(result[0])
    }
}