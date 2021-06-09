export abstract class Cholesterol {

    public level: number;
    public id: number;
    public date: Date; 

    constructor(id: number, level: number, date: Date){
        this.id = id;
        this.level = level;
        this.date = date;
    }
}