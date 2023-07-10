import React, {useContext, useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import {ISetPlayAnimation} from '../types';
import {GameContext} from "@/context/game";

type IMetricChartAnimatedLineProps = {
    path: string;
    length: number;
    timing: number;
    lineColor: string;
    playAnimation: boolean;
    setPlayAnimation: ISetPlayAnimation;
}

const MetricChartAnimatedLine: React.FunctionComponent<IMetricChartAnimatedLineProps> = ({
                                                                                             path,
                                                                                             length,
                                                                                             timing,
                                                                                             lineColor,
                                                                                             playAnimation,
                                                                                             setPlayAnimation
                                                                                         }) => {

  const {setRes, setShowRes, players, setplayers , setScore} = useContext(GameContext);

    const spring = useSpring<any>(() => ({
        config: {duration: timing},
        value: length,
        from: {value: length}
    }));

    useEffect(() => {
        setPlayAnimation(true);
        
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setRes(9.34);
            setShowRes(true);
            let newPlayers: any = []
            console.log("bbbb : ", players);
            players.map((item: any, index: any) => {
                item.multiplier > 9.34 ? newPlayers.push({
                    ...item,
                    score: 1000 - item.point,
                    id: index
                }) : newPlayers.push({...item, score: (1000 - item.point) + (item.point * item.multiplier), id: index})
            })
            console.log("new L: ", newPlayers);
            setplayers(newPlayers);
            setScore(newPlayers[0].score);
        }, timing);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [players]);



    useEffect(() => {
        if (playAnimation) {
            spring[1]({value: 1});
        }
    }, [playAnimation]);

    return (
        <>
            <animated.path
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                strokeDashoffset={spring[0].value}
                strokeDasharray={length}
                d={path}
                style={{willChange: 'stroke-dashoffset', transform: 'translate3d(0, 0, 0)'}}
            />
            <animated.path
                fill="none"
                stroke={lineColor}
                strokeWidth="10"
                strokeDashoffset={spring[0].value}
                strokeLinecap="round"
                strokeDasharray={`0 ${length}`}
                d={path}
                style={{willChange: 'stroke-dashoffset', transform: 'translate3d(0, 0, 0)'}}
            />
        </>
    );
};

export default MetricChartAnimatedLine;
