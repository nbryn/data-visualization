import { ChartData, TodayData } from '../store/datamodels/General';
import { ChartjsData, ChartjsLastMonthData, ChartjsPieData } from '../store/datamodels/Chartjs';
import { convertNumberToMonth } from '../util/Date';
import { GroupData, GroupDataProp } from '../store/datamodels/Group';
import { GroupDto, Name } from '../services/requests';
import { IntervalDto, LastMonthDto, LastYearDto, ServerDto } from '../services/requests/Dto';

export const mapDataForToday = (data: LastMonthDto[]): TodayData => {
    const temp: ChartData[] = mapLastMonthBarChartData(data);

    const todayCount: number = temp[temp.length - 1].value;
    const todayDate: string = temp[temp.length - 1].name;

    const result = {
        todayCount,
        todayDate,
    };

    return result;
};

export const mapGeneralChartData = (data: ServerDto[]): ChartData[] => {
    const result = data.map((element: ServerDto) => {
        return {
            name: element.name,
            value: element.count,
        };
    });

    return result;
};

export const mapLastMonthBarChartData = (data: LastMonthDto[]): ChartData[] => {
    const lastMonthData = data.map((element: LastMonthDto) => {
        return {
            name: element.day.day + '/' + element.day.month,
            value: element.count,
        };
    });

    return lastMonthData;
};

export const mapLastYearBarChartData = (data: LastYearDto[]): ChartData[] => {
    let month, year;
    const lastYear = data.map((element: LastYearDto) => {
        year = element.year.toString().substring(2);
        month = convertNumberToMonth(element.month);

        return {
            name: month + " '" + year,
            value: element.count,
        };
    });

    return lastYear;
};

export const mapLastYearLineChartData = (data: LastYearDto[]): ChartData[] => {
    let total: number = 0;
    let month, year: string;
    const lastYear = data.map((element: LastYearDto) => {
        total += element.count;
        year = element.year.toString().substring(2);
        month = convertNumberToMonth(element.month);

        return {
            name: month + " '" + year,
            value: total,
        };
    });
    return lastYear;
};

export const getTotalNumberInPeriod = (data: IntervalDto[]): number => {
    let result: number = 0;

    data.map((element: IntervalDto) => (result += element.count));

    return result;
};

export const mapChartjsPieChartData = (data: ServerDto[]): ChartjsPieData => {
    const pieChartData: any = {
        labels: [],
        data: [],
    };

    data.forEach((element: any) => {
        pieChartData.labels.push(element.name);
        pieChartData.data.push(element.count);
    });

    return pieChartData;
};

export const mapChartjsLastMonthData = (data: LastMonthDto[], aggregate: boolean): ChartjsLastMonthData => {
    const lastMonth: ChartjsLastMonthData = {
        labels: [],
        data: [],
        counter: 0,
        lastWeek: {
            labels: [],
            data: [],
            counter: 0,
        },
    };

    lastMonth.labels = data.map((element: LastMonthDto) => element.day.day + '/' + element.day.month);
    lastMonth.data = data.map((element: LastMonthDto) => {
        const counter = (lastMonth.counter += element.count);
        if (aggregate) return counter;
        else return element.count;
    });

    lastMonth.lastWeek.labels = lastMonth.labels.slice(lastMonth.labels.length - 7);

    const lastWeek: LastMonthDto[] = data.slice(data.length - 7);

    lastMonth.lastWeek.data = lastWeek.map((element: LastMonthDto) => {
        const counter = (lastMonth.lastWeek.counter += element.count);
        if (aggregate) return counter;
        else return element.count;
    });

    return lastMonth;
};

export const mapChartjsLastYearData = (data: LastYearDto[], aggregate: boolean): ChartjsData => {
    const lastYear: ChartjsData = {
        labels: [],
        data: [],
        counter: 0,
    };

    lastYear.labels = data.map((element: LastYearDto) => {
        return convertNumberToMonth(element.month) + "'" + element.year.toString().substring(2);
    });

    lastYear.data = data.map((element: LastYearDto) => {
        const counter = (lastYear.counter += element.count);
        if (aggregate) return counter;
        else return element.count;
    });

    return lastYear;
};

export const mapGroupSearchData = (data: GroupDto): GroupDataProp => {
    const groupData = Object.keys(data).map((info: string) => {
        if (info === 'owner') {
            return data[info].firstName + ' ' + data.owner.lastName;
        } else if (info === 'admin') {
            return data[info].firstName + ' ' + data.admin.lastName;
        } else if (info === 'members') {
            return data[info].map((member: Name) => {
                return {
                    name: member.firstName + ' ' + member.lastName,
                };
            });
        } else {
            return data[info];
        }
    });

    // @ts-ignore
    return groupData;
};

export const mapNGOGroupsData = (data: GroupDto[]): GroupData[] => {
    let id: number = 0;
    const groupsData = data.map((element: GroupDto) => {
        return {
            id: id++,
            ...element,
            admin: element.admin.firstName + ' ' + element.admin.lastName,
            owner: element.owner.firstName + ' ' + element.owner.lastName,
            members: element.members.map((member: Name) => {
                return {
                    name: member.firstName + ' ' + member.lastName,
                };
            }) as unknown,
        };
    });

    return groupsData as GroupData[];
};
