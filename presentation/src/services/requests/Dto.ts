export type ServerDto = {
    name: string;
    count: number;
}

export type Day = {
    year: string;
    month: string;
    day: string;
}

export type LastMonthDto = {
    count: number;
    day: Day;
}

export type LastYearDto = {
    month: string;
    year: string;
    count: number;
}

export type IntervalDto = LastMonthDto | LastYearDto;