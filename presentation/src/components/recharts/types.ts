import {LabelProps} from 'recharts';

import {ChartData} from '../../store/datamodels/General';

export type ChartProps = {
   title: string;
   data: ChartData[];
   yLabelConfig: LabelProps;
   xLabelConfig: LabelProps;
   strokeColor: string;
   height?: number;
};
