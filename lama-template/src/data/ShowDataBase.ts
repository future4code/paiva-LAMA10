import { NotFoundError } from './../error/NotFoundError';
import { Band } from './../model/Band';
import { Show, ShowOutputDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase{

    // private static TABLE_NAME = "TABELA_SHOWS_LAMA"

    async createShow(show: Show): Promise<void>{
       try {
           await this.getConnection().insert({
               id: show.getId(),
               band_id: show.getBandId(),
               start_time: show.getStartTime(),
               end_time: show.getEndTime(),
               week_day: show.getWeekDay(),
              
           }).into(this.TABLE_NAME.SHOWS)
       } catch (error) {
            throw new Error(error.sqlMessage || error.message);
       } 
    }

    public async getShowsByTimes(
        weekDay: WeekDay,
        startTime: number,
        endTime: number
    ): Promise<ShowOutputDTO[]> {

        const shows = await this.getConnection()
        .select("*").where("end_time", ">", `${startTime}`)
        .andWhere("start_time", "<", `${endTime}`)
        .from(this.TABLE_NAME.SHOWS)

        return shows.map((show: any) => {
            return {
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime,
                endTime: show.endTime,
                weekDay: weekDay
            }
        })
    }

    public async getShowsByWeekDay(
        weekDay: WeekDay,
    ): Promise<ShowOutputDTO[]> {

        const shows = await this.getConnection().raw(`
        SELECT s.id as id,
        b.id as bandId,
        s.start_time as startTime,
        s.end_time as endTime,
        s.week_day as weekDay,
        b.music_genre as musicGenre,
        b.name as name
        FROM ${this.TABLE_NAME.SHOWS} s
        LEFT JOIN ${this.TABLE_NAME.BAND} b ON b.id = s.band_id
        WHERE s.week_day = "${weekDay}"
        ORDER BY startTime ASC
        `)
        
        if(!shows.length){
            throw new NotFoundError("Não há shows nesse dia")
        }

        return shows[0].map((data: any) => ({
            name: data.name,   
            musicGenre: data.musicGenre
        }))
        
    }
}