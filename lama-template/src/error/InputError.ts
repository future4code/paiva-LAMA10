import { BaseError } from "./BaseError";

export class InputError extends BaseError{
    constructor(mesage: string){
        super(mesage, 417)
    }
}