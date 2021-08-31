import { InputError } from "../error/InputError";

export class Show{
    constructor(
        private id: string,
        private weekDay: WeekDay,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ){}

    getId(){
        return this.id;
    }

    getWeekDay(){
        return this.weekDay;
    }

    getStartTime(){
        return this.startTime;
    }

    getEndTime(){
        return this.endTime;
    }

    getBandId(){
        return this.bandId
    }

    setId(id: string){
        this.id = id;
    }

    setWeekDay(weekDay: WeekDay){
        this.weekDay = weekDay;
    }

    setStartTime(startTime: number){
        this.startTime = startTime;
    }

    setEndTime(endTime: number){
        this.endTime = endTime;
    }

    static toWeekDayEnum(data?: any): WeekDay{
        switch(data){
            case "FRIDAY":
                return WeekDay.FRIDAY
            case "SATURDAY":
                return WeekDay.SATURDAY
            case "SUNDAY":
                return WeekDay.SUNDAY
            default:
                throw new InputError("Invalid weekDay")      
            }
    }

    static toShowModel(data?: any){
        return (data && new Show(
            data.id,
            Show.toWeekDayEnum(data.weekDay || data.week_day),
            data.startTime || data.start_time,
            data.endTime || data.end_time,
            data.bandId || data.band_id
        ))
    }
}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export interface ShowInputDTO{
    bandId: string,
    weekDay: WeekDay,
    startTime: number,
    endTime: number
}


export interface ShowOutputDTO{
    id: string,
    bandId: string,
    weekDay: WeekDay,
    startTime: number,
    endTime: number
}