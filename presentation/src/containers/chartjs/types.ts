export type Chart = {
  chartData: ChartData;
  labels: string[];
  // intervalStart: string;
  // intervalEnd: string;
  loading: boolean;
  handleChangeInterval: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ChartData = {
  counter: number;
  data: number[];
};
