import React from "react";
import styles from './chat-container.module.css'
import {Tag} from 'antd';

const ChatContainer = ({messages} : {messages : any[]}) => {

    
    return (
        <div className={styles.parentContainer}>
            <div className={styles.scrollableCcontainer}>
                <ul>
                    {
                    messages?.map((message : any , index : number) => (
                        <li key={index} style={{marginBottom : '5px'}}>
                            <span>
                                {message?.name}
                            </span>
                            <Tag color="#6f748f" style={{marginLeft: "5px"}}>{message?.value} </Tag>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}
export default ChatContainer