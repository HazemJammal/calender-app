export interface CalendarEvent{
    summary: string;
    day:Date;
    time: string;
    backgroundColor: string;
    startTime: Date;
    endTime: Date;
    width: number;
    left: number;
}

export interface AddEvent{
    start:{
        dateTime: string;
        timeZone: string
    };
    end:{
        dateTime: string;
        timeZone: string
    };
    summary: string;
    colorId: string;
    description: string;
}

