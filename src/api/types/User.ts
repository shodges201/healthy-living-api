export class User {

    public username: string;
    public oktaId: string; 
    public email: string;
    public phoneNumber: number;
    public firstName: string;
    public lastName: string;
    public createdDate: Date; 

    constructor(username: string, oktaId: string, email: string, phoneNumber:number, firstName: string, lastName: string, createdDate: Date){
        this.username = username;
        this.oktaId = oktaId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdDate = createdDate;
    }
}