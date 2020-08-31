import {ChartjsData} from '../../store/datamodels/Chartjs';

export type Chart = {
   chartData: ChartjsData;
   loading: boolean;
   handleChangeInterval: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export enum Interval {
   WEEK = 'Week',
   MONTH = 'Month',
   YEAR = 'Year',
}

export function resolveInterval(interval: string): Interval {
   if (interval === 'Week') return Interval.WEEK;
   if (interval === 'Month') return Interval.MONTH;
   else return Interval.YEAR;
}
