import { Show, ShowOutputDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase{

    private static TABLE_NAME = "TABELA_SHOWS_LAMA"

    async createShow(show: Show): Promise<void>{
       try {
           await this.getConnection().insert({
               id: show.getId(),
               band_id: show.getBandId(),
               start_time: show.getStartTime(),
               end_time: show.getEndTime(),
               week_day: show.getWeekDay(),
              
           }).into(ShowDataBase.TABLE_NAME)
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
        .from(ShowDataBase.TABLE_NAME)

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
}