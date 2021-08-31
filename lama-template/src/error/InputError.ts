import { BaseError } from "./BaseError";

export class InputError extends BaseError{
    constructor(message: string){
        super(message, 417)
    }
}