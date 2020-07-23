export type Chart = {
  chartData: ChartData;
  labels: string[];
  loading: boolean;
  handleChangeInterval: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ChartData = {
  counter: number;
  data: number[];
};
