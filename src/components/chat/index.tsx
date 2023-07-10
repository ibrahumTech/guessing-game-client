import React, {useEffect, useState} from "react";
import ChatBox from "@/components/chat/chat-box";
import ChatContainer from "@/components/chat/chat-container";
import io , {Socket} from "socket.io-client";

const Chat = () => {
    const [socket , setSocket] = useState<Socket>();
    const [messages , setMessages] = useState<any[]>([]);
    
    const send = (value : any) => {
        socket?.emit('message' , {name: "ibrahim" , value: value});
        setMessages([...messages , {name : "CPU 1 : " , value: 'Hi'}]);
    }
    useEffect(() => {
        const newSocket = io('http://localhost:8002');
        setSocket(newSocket);
    }, [setSocket])
    
    const messageListener = (nMessages : any) => {
        setMessages([...messages , nMessages])
        console.log("mee : " , messages);
    }
    
    useEffect(() => {
        socket?.on('message' , messageListener)
        return() => {
            socket?.off('message' , messageListener)
        }
    }, [messageListener])
    
    return (
        <React.Fragment>
            <ChatBox send={send}/>
            <ChatContainer messages = {messages} />
        </React.Fragment>
    )
}

export default  Chat;