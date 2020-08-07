import { ChartjsData } from '../../store/datamodels/Chartjs';

export type Chart = {
    chartData: ChartjsData;
    loading: boolean;
    handleChangeInterval: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
