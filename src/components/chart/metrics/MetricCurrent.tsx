import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useSpring, animated } from 'react-spring';
import { IMetricChartData } from '../types';

type IMetricProps = {
  label: string;
  dataPoints: IMetricChartData;
  timing: number;
  playAnimation: boolean;
}

const useStyles = createUseStyles({
  container: {
    height: '50%',
    width: '57%',
    maxWidth: '15rem',
    maxHeight: '6.6rem',
    position: 'absolute',
    borderRadius: '5px',
    zIndex: 1,
    top: 0,
    left: 0,
    padding: '1.1rem'
  },
  value: {
    fontSize: '2rem',
    fontWeight: 700,
    marginLeft: '.75rem',
    color: '#FFF',
  },
  valueContainer: {
    display: 'flex',
    marginTop: '.5rem'
  },
  name: {
    color: '#EAEAEE',
    fontSize: '1rem'
  }
});


function formatValue(label: string, value: number): string {
  const floored = Math.floor(value);
  return  `${value / 1000000}x`
}

const MetricCurrent: React.FunctionComponent<IMetricProps> = ({ label, dataPoints, timing, playAnimation }) => {
  const styles = useStyles();
  const current = Math.max(...dataPoints.map(dataPoint => dataPoint.value));
  const spring = useSpring(() => ({
    config: { duration: timing },
    current: 0,
    from: { current: 0 },
    onRest: () => {
      console.log('Animation finished');
    }
  }));

  useEffect(() => {
    if (playAnimation) {
      spring[1]({ current });
    }
  }, [playAnimation, spring, current]);

  return (
    <div className={styles.container}>
      <div className={styles.valueContainer}>
        <span className={styles.value}>
          <animated.span className={styles.value}>
            {spring[0].current.interpolate((x : any) => formatValue(label, x))}
          </animated.span>
        </span>
      </div>
    </div>
  );
};

export default MetricCurrent;
