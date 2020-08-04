import { convertNumberToMonth } from '../util/Date';

export const mapDataForToday = (data: any): any => {
    const temp: any = mapLastMonthBarChartData(data);

    const todayCount: number = temp[temp.length - 1].value;
    const todayDate: string = temp[temp.length - 1].name;

    const result = {
        todayCount,
        todayDate,
    };

    return result;
};

export const mapGeneralChartData = (data: any): any => {
    const result = data.map((element: any) => {
        return {
            name: element.name,
            value: element.count,
        };
    });

    return result;
};

export const mapLastMonthBarChartData = (data: any): any => {
    const lastMonthData = data.map((element: any) => {
        return {
            name: element.day.day + '/' + element.day.month,
            value: element.count,
        };
    });

    return lastMonthData;
};

export const mapLastYearBarChartData = (data: any): any => {
    let month, year;
    const lastYear = data.map((element: any) => {
        year = element.year.toString().substring(2);
        month = convertNumberToMonth(element.month);

        return {
            name: month + " '" + year,
            value: element.count,
        };
    });

    return lastYear;
};

export const mapLastYearLineChartData = (data: any): any => {
    let total: number = 0;
    let month, year;
    const lastYear = data.map((element: any) => {
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

export const getTotalNumberInPeriod = (data: any): number => {
    let result: number = 0;

    data.map((element: any) => (result += element.count));

    return result;
};

export const mapChartjsLastMonthData = (data: any): any => {
    const usersLastMonth = {
        labels: [],
        data: [],
        counter: 0,
        lastWeek: {
            labels: [],
            data: [],
            counter: 0,
        },
    };

    usersLastMonth.labels = data.map(
        (element: any) => element.day.day + '/' + element.day.month
    );
    usersLastMonth.data = data.map(
        (element: any) => (usersLastMonth.counter += element.count)
    );

    usersLastMonth.lastWeek.labels = usersLastMonth.labels.slice(
        usersLastMonth.labels.length - 7
    );

    const lastWeek = data.slice(data.length - 7);

    usersLastMonth.lastWeek.data = lastWeek.map(
        (element: any) => (usersLastMonth.lastWeek.counter += element.count)
    );

    return usersLastMonth;
};

export const mapChartjsLastYearData = (data: any): any => {
    const usersLastYear = {
        labels: [],
        data: [],
        counter: 0,
    };
    usersLastYear.labels = data.map((element: any) => {
        return (
            convertNumberToMonth(element.month) +
            "'" +
            element.year.toString().substring(2)
        );
    });

    usersLastYear.data = data.map(
        (element: any) => (usersLastYear.counter += element.count)
    );

    return usersLastYear;
};

export const mapGroupSearchData = (data: any): any => {
    const groupData = Object.keys(data).map((info: string) => {
        if (info === 'owner') {
            return data[info].firstName + ' ' + data.owner.lastName;
        } else if (info === 'admin') {
            return data[info].firstName + ' ' + data.admin.lastName;
        } else if (info === 'members') {
            return data[info].map((member: any) => {
                return {
                    name: member.firstName + ' ' + member.lastName,
                };
            });
        } else {
            return data[info];
        }
    });

    return groupData;
};

export const mapNGOGroupsData = (data: any): any => {
    let id = 0;
    const groupsData = data.map((element: any) => {
        return {
            id: id++,
            ...element,
            admin: element.admin.firstName + ' ' + element.admin.lastName,
            owner: element.owner.firstName + ' ' + element.owner.lastName,
            members: element.members.map((member: any) => {
                return {
                    name: member.firstName + ' ' + member.lastName,
                };
            }),
        };
    });

    return groupsData;
};
