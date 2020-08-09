import React, { ReactElement } from 'react';
import { Cell, PieChart as PieChartt, Pie } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: -10,
        width: 485,
        left: -200,
        textAlign: 'center',
    },
    spinner: {
        margin: 125,
        marginLeft: 200,
    },
}));

type Props = {
    title: string;
    data: any;
    colors: string[];
};

const PieChart: React.FC<Props> = ({
    title,
    data,
    colors,
}: Props): ReactElement => {
    const classes = useStyles();

    const renderLabel = (entry: any) => {
        return entry.name;
    };

    return (
        <>
            <div className={classes.title}>
                <p>{title}</p>
            </div>
            {data.length === 0 ? (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            ) : (
                <PieChartt width={450} height={300}>
                    <Pie
                        label={renderLabel}
                        dataKey="value"
                        nameKey="name"
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#82ca9d"
                    >
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Pie>
                </PieChartt>
            )}
        </>
    );
};

export default PieChart;
