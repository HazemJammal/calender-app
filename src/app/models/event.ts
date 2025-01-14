export interface CalendarEvent{
    day:Date;
    title: string;
    time: string;
    backgroundColor: string;
    startTime: Date;
    endTime: Date;
}

export interface AddEvent{
    startTime: Date;
    endTime: Date;
    title: string;
    colorId: string;
}