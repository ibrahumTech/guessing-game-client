import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Row} from "antd";
import styles from './game.module.css';
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import CustomTable from "@/components/table";
import Image from 'next/image';
import SliderComponent from "@/components/slider";
import {GameContext} from "@/context/game";


const Game = ({send, players}: { send: (points: number, multiplier: number, name: string) => void, players: any }) => {
    const [points, setPoints] = useState<number>(0);
    const [multiplier, setMultiplier] = useState<number>(1.0);
    const {name , setNumber , setShow , setScore , setplayers} = useContext(GameContext);

    useEffect(() => {
        console.log("ins : " , players);
        setplayers(players);
    },[players , setplayers])
    
    
    return (
        <React.Fragment>
            <Col className={styles.container}>
                <Row gutter={[16, 16]} justify={"space-between"}>
                    <Col span={11} className={styles.smallCard}>
                        <Row gutter={[24, 24]}>
                            <Col span={4} className={styles.iconContainerLeft} onClick={() => {
                                points > 0 ? setPoints(points - 25) : setPoints(0)
                            }}>
                                <CaretDownOutlined/>
                            </Col>
                            <Col span={10} className={styles.iconPoints}>
                                <h3>{points}</h3>
                            </Col>
                            <Col span={4} className={styles.iconContainerRight} onClick={() => setPoints(points + 25)}>
                                <CaretUpOutlined/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11} className={styles.smallCard}>
                        <Row gutter={[24, 24]}>
                            <Col span={4} className={styles.iconContainerLeft} onClick={() => {
                                multiplier > 1 ? setMultiplier(multiplier - 0.25) : setMultiplier(0)
                            }}>
                                <CaretDownOutlined/>
                            </Col>
                            <Col span={10} className={styles.iconPoints}>
                                <h3>{multiplier}</h3>
                            </Col>
                            <Col span={4} className={styles.iconContainerRight}
                                 onClick={() => setMultiplier(multiplier + 0.25)}>
                                <CaretUpOutlined/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div>
                    <Button onClick={() => {
                        send(points, multiplier, name)
                        setNumber((Math.random() * 10).toFixed(2))
                        setShow(true)
                        setScore(1000 - points);
                    }} className={styles.startBtn}><h3 style={{color: 'white'}}>Start</h3></Button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <span style={{display: 'flex'}}>
                        <Image
                            style={{marginTop: '4px'}}
                            src="/medal.png"
                            alt="My Image"
                            width={15}
                            height={15}
                        />
                        <h4 className={styles.subject}>Current Score</h4>
                    </span>
                    <CustomTable data={players} isRank={false}/>
                </div>
                <div style={{marginTop: '10px'}}>
                <span style={{display: 'flex'}}>
                    <Image
                        style={{marginTop: '4px'}}
                        src="/medal.png"
                        alt="My Image"
                        width={15}
                        height={15}
                    />
                    <h4 className={styles.subject}>Speed</h4>
                </span>
                </div>
                <div className={styles.containerSlider}>
                    <SliderComponent/>
                </div>
            </Col>
        </React.Fragment>
    )
};

export default Game;