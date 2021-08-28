export class Band{
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getMusicGenre(){
        return this.music_genre;
    }

    getResponsible(){
        return this.responsible
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setMusicGenre(music_genre: string){
        return this.music_genre = music_genre;
    }

    setResponsible(responsible: string){
        this.responsible = responsible;
    }

    static toBandModel (band: any): Band {
        return new (band.id, band.name, band.music_genre, band.responsible)
    }
}


export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string;
}

