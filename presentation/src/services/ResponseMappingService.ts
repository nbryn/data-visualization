import { convertNumberToMonth } from '../util/Date';

export const mapGeneralStat = (data: any): any => {
    const result = data.map((element: any) => {
        return {
            name: element.name,
            value: element.count
        };
    });

    console.log(result);

    return result;
};

export const mapLastMonthBarChartData = (data: any): any => {
    const lastMonthData = data.map((element: any) => {
        return {
            name: element.day.day + '/' + element.day.month,
            value: element.count
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
            value: element.count
        };
    });

    console.log(lastYear);
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
            value: total
        };
    });
    return lastYear;
};

export const mapChartjsLastYearData = (data: any): any => {
    const usersLastYear = {
        labels: [],
        data: [],
        counter: 0
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

export const getTotalNumberInPeriod = (data: any): number => {
    let result: number = 0;

    data.map((element: any) => result += element.count);

    return result;
}
