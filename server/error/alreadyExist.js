export class AlreadyExist extends Error{
    constructor(message){
        super(message);
        this.name = "Data Already Exist"
        this.statusCode = 409;
    }
}