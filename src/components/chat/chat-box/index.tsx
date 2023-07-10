import React, {useState} from "react";
import styles from './chat-box.module.css'
import {Button, Input} from "antd";

const ChatBox = ({send} : {send: (val : string) => void}) => {
    const [value , setValue] = useState("");
    
    return (
        <div className={styles.container}>
            <Input onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{setValue(e.target.value)}} className = {styles.input} />
            <Button className={styles.send} onClick={() => send(value)}>Send</Button>
        </div>
    )
}

export default ChatBox;