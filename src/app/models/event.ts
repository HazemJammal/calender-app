export interface Event{
    id: string;
    start: {
        date: Date;
        timeZone: string
    }
    end: {
        date: Date;
        timeZone: string
    }
} 