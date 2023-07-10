import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Input, Row} from "antd";
import {GameContext} from "@/context/game";
import styles from './welcome.module.css';
import Game from "@/components/game";
import io , {Socket} from "socket.io-client";

const Welcome = () => {
    const {setName} = useContext(GameContext);
    const [showWelcome, setShowWelcome] = useState<Boolean>(true)
    const [value , setValue] = useState("")
    
    const [socket , setSocket] = useState<Socket>();
    const [players , setPlayers] = useState<any[]>([]);

    const send = (points : any , multiplier : any , name : any) => {
        socket?.emit('player' , {name: name , point: points , multiplier : multiplier });
    }
    useEffect(() => {
        const newSocket = io('http://localhost:8003');
        setSocket(newSocket);
        }, [setSocket])

    const messageListener = (nPlayer : any) => {
        setPlayers(nPlayer)
        console.log("mee : " , players);
    }

    useEffect(() => {
        socket?.on('player' , messageListener)
        return() => {
            socket?.off('player' , messageListener)
        }
    }, [messageListener])
    
    return (
        <React.Fragment>
            {
                showWelcome ? (
                    <Col className={styles.container}>
                        <div className={styles.content}>
                            <h1 style={{padding: '70px 140px', color: 'rgba(255,255,255,0.79)'}}>Welcome</h1>
                            <h5 style={{color: 'rgba(255,255,255,0.37)'}}>please insert your name</h5>

                            <Input onChange={(e: any) => {
                                setValue(e.target.value)
                            }} style={{
                                background: '#1c1c1f',
                                color: '#FFF',
                                margin: '10px 10px',
                                width: '80%',
                                border: "solid 1px rgba(255, 255, 255, 0.2)",
                                height: '40px',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}/>
                            <Button onClick={() => {
                                setName(value);
                                setShowWelcome(false)
                            }} style={{
                                background: 'linear-gradient(to right, #ff8a00, #da1b60)',
                                color: '#fff',
                                border: 'none',
                                width: '80%',
                                height: '40px'
                            }}>Accept</Button>
                        </div>
                    </Col>
                ) : (
                    <Game  send = {send} players = {players}/>
                )
            }

        </React.Fragment>
    )
}

export default Welcome