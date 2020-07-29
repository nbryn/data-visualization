export interface Dataset {
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

export type Chart = {
    labels: string[];
    datasets: Dataset[];
};
