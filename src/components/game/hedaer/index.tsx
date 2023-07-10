import React, {useContext, useEffect, useState} from "react";
import Image from 'next/image';
import {Col, Row} from "antd";
import Chart from "@/components/chart";
import {GameContext} from "@/context/game";
import styles from './header.module.css'

const Header = () => {
    const { name , score} = useContext(GameContext);
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            }, 1000);

       
        return () => {
            clearInterval(interval);
        };
        }, []);
    
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return(
        <React.Fragment>
            <div className={styles.high}>
                <Row gutter={[24, 24]}>
                    <Col className={styles.smallCard}>
                        <span style={{display : 'flex'}}>
                            <Image
                                style={{marginTop : '4px'}}
                                src="/medal.png" 
                                alt="My Image" 
                                width={30} 
                                height={30} 
                            />
                            <h2 className={styles.subject}>{score}</h2>
                        </span>
                    </Col>
                    <Col className={styles.smallCard}>
                        <span style={{display : 'flex'}}>
                            <Image
                                style={{marginTop : '4px'}}
                                src="/man.png" 
                                alt="My Image" 
                                width={30} 
                                height={30} 
                            />
                            <h2 className={styles.subject}>{name}</h2>
                        </span>
                    </Col>
                    <Col className={styles.smallCard}>
                        <span style={{display : 'flex'}}>
                            <Image
                                style={{marginTop : '4px'}}
                                src="/clock.png" 
                                alt="My Image" 
                                width={30} 
                                height={30} 
                            />
                            <h2 className={styles.subject}>{hours} : {minutes}</h2>
                        </span>
                    </Col>
                </Row>
            </div>
            <div className={styles.bigCard}>
                <React.StrictMode>
                    <Chart />
                </React.StrictMode>
            </div>
        </React.Fragment>
    )
}
export default Header;