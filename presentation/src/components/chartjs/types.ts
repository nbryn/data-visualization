export interface LineChartDataset {
    label: string;
    fill: boolean;
    pointHoverBorderWidth?: number;
    pointRadius?: number;
    pointHitRadius?: number;
    backgroundColor: string;
    borderColor: string;
    pointBorderColor: string;
    pointBackgroundColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
    pointBorderWidth: number;
    pointHoverRadius: number;
    data: number[];
    counter: number;
}

export interface BarChartDataset {
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    hoverBackgroundColor: string;
    hoverBorderColor: string;
    data: number[];
    counter: number;
}

export interface PieChartDataset {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
}

export interface LineChart {
    labels: string[];
    datasets: LineChartDataset[];
}

export interface BarChart {
    labels: string[];
    datasets: BarChartDataset[];
}

export interface PieChart {
    labels: string[];
    datasets: PieChartDataset[];
}