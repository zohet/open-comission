//Event:  Simboliza un periodo de tiempo en el cual un promotor se encontrará trabajando
export class Event { 
    uid?: string;
    branch: string;
    promoter?: string;
    eventDateBegin: Date;
    eventDateExp: Date;
    status?: boolean;
    hourWorkdayBegin: string;
    hourWorkdayEnd: string;
}