type Month = {
    [key: string]: string;
}

export const getCurrentTime = () => {
    let date: Date = new Date();
    let minutes: string = date.getMinutes().toString();
    let hours: string = date.getHours().toString();
    let day: string = date.getDate().toString();
    let month: string = getMonth(true);

    if (parseInt(minutes) < 10) {
        minutes = '0' + minutes;
    }

    if (parseInt(hours) < 10) {
        hours = '0' + hours;
    }

    if (parseInt(day) < 10) {
        day = '0' + day;
    }

    let currentTime = day + '/' + month + ' at ' + hours + ':' + minutes;

    return currentTime;
};

export const getMonth = (number: boolean): string => {
    const months = [
        'Januar',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let date: Date = new Date();

    let month: string = (date.getMonth() + 1).toString();

    if (parseInt(month) < 10) {
        month = '0' + month;
    }

    if (number) {
        return month;
    } else {
        return months[parseInt(month) - 1].toString();
    }
};

export const convertNumberToMonth = (monthNumber: string): string | undefined => {
    let result: string = '';
    const number = monthNumber.toString();

    const months: Month = {
        '1': 'jan',
        '2': 'feb',
        '3': 'mar',
        '4': 'apr',
        '5': 'may',
        '6': 'jun',
        '7': 'jul',
        '8': 'aug',
        '9': 'sep',
        '10': 'oct',
        '11': 'nov',
        '12': 'dec',
    };

    for (let key in months) {
        if (number === key) {
            result = months[key];
        }
    }

    return result;
};
