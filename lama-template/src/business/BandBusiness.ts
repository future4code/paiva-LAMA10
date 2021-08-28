import { IdGenerator } from './../services/IdGenerator';

export class BandBusiness{
    async createBand (){
        
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        
}