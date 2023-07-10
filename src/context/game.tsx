"use client"
import React , {useState , createContext} from "react";


export const GameContext = createContext<any>(null);

export const GameContexProvider = ({children} : any) => {
    const [name , setName] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [score , setScore] = useState<number>(1000);
    const [number , setNumber] = useState<number>(5.55);
    const [res , setRes] = useState<number>(1000);
    const [showRes , setShowRes] = useState<Boolean>(false)
    const [players , setplayers] = useState<any>([])
    
    return(
        <GameContext.Provider value={{ name, setName , show , setShow , score , setScore , number , setNumber , res , setRes , showRes , setShowRes , players , setplayers}}>
            {children}
        </GameContext.Provider>
    )
    
}