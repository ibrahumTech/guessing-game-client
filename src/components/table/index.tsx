import React, {useContext, useEffect, useState} from 'react';
import './CustomTable.css';
import {isEmptyValue} from "@/utils";
import {GameContext} from "@/context/game";


const columnsInit = [
    { header: 'Name', key: 'name' },
    { header: 'Point', key: 'point' },
    { header: 'multiplier', key: 'multiplier' },
];

const rankColumnsInit = [
    { header: 'No.', key: 'id' },
    { header: 'name', key: 'name' },
    { header: 'Score', key: 'score' },
];

const CustomTable = ({data , isRank} : {data : any , isRank : Boolean}) => {
    
    const [dataTable , setDataTable] = useState<any>([]);
    const [columns , setColumns] = useState<any>([]);
    const {res , showRes , players} = useContext(GameContext);
    
    useEffect(() => {
        if(!isRank){
            setColumns(columnsInit)
            if(isEmptyValue(data)){
                setDataTable([
                    { name: 1, point: '-', multiplier: '-' },
                    { name: 2, point: '-', multiplier: '-' },
                    { name: 3, point: '-', multiplier: '-' },
                    { name: 4, point: '-', multiplier: '-' },
                    ])
            }else {
                setDataTable(data)
            }   
        }else {
            console.log('player : ' , players);
            if(isEmptyValue(players)){
                setColumns(rankColumnsInit);
                setDataTable([
                    { id: 1, name: '-', score: '-' },
                    { id: 2, name: '-', score: '-' },
                    { id: 3, name: '-', score: '-' },
                    { id: 4, name: '-', score: '-' },
                ])
            }else {
                setDataTable(players)
            }
        }
    },[data , showRes , players])
    
    
    
    return (
        <table className="custom-table">
            <thead>
            <tr>
                {columns?.map((column) => (
                    <th style={{textAlign : 'start'}} key={column.key}>{column.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {dataTable?.map((item : any , index : any) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'} style={item.multiplier !== '-' && showRes ? (item.multiplier < res) ? {color : "green"} : {color: "red"} : {color: 'white'}}>
                    {columns.map((column) => (
                        <td key={column.key}>{item[column.key]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CustomTable;