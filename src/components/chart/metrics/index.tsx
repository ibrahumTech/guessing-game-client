import React, {useContext, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import Metric from './Metric';
import {IMetricChartDataPoint} from '../types/metric'
import {isEmptyValue} from "@/utils";
import {GameContext} from "@/context/game";

const useStyles = createUseStyles({
    metrics: {
        maxWidth: '100rem',
        margin: '5rem auto 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
});


const Metrics = () => {
    const styles = useStyles();
    const [metricsData, setMetricsData] = useState<IMetricChartDataPoint[]>([])
    const {show } = useContext(GameContext);
    

    useEffect(() => {
        let matrix: IMetricChartDataPoint[] = [];
        for (let i = 1; i <= 10; i++) {
            const number = +(Math.random() * 10).toFixed(2);
            matrix.push({index: i, value: number});
        }
        matrix.sort((a: IMetricChartDataPoint, b: IMetricChartDataPoint) => a.value + b.value);
        console.log("data : ", matrix);
        setMetricsData(matrix);
    }, [])


    return (
        <div className={styles.metrics}>
            {
                !show ? (<div style={{textAlign: 'center', width: '100%'}}><h1>0.0x</h1></div>) : (
                    <Metric label="ML Projects" dataPoints={[{"index": 1610989742, "value": 9340000},
                        {"index": 1609459200, "value": 8500000},
                        {"index": 1606780800, "value": 7300000},
                        {"index": 1604188800, "value": 6150000},
                        {"index": 1601510400, "value": 5800000},
                        {"index": 1598918400, "value": 4900000},
                        {"index": 1596240000, "value": 4100000},
                        {"index": 1593561600, "value": 3900000},
                        {"index": 1590969600, "value": 3100000},
                        {"index": 1588291200, "value": 2900000},
                        {"index": 1585699200, "value": 1900000},
                        {"index": 1583020800, "value": 1500000},
                        {"index": 1580515200, "value": 1000000},
                        {"index": 1577836800, "value": 0}]} key={0} lineColor={'#F6572C'}/>)
            }
        </div>
    );
};

export default Metrics;
