import { ChartjsData } from '../../store/datamodels/User';

export type Chart = {
    chartData: ChartjsData;
    loading: boolean;
    handleChangeInterval: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

