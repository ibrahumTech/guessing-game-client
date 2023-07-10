"use client"
import React, {useContext} from "react";
import {Col, Row, Input, Button} from 'antd';
import CustomTable from "@/components/table";
import Chat from "@/components/chat";
import {GameContext} from "@/context/game";
import Welcome from "@/components/welcome";
import Header from "@/components/game/hedaer";


const Layout = () => {
    const { name, setName } = useContext(GameContext);
    return (
        <React.Fragment>
            <Row gutter={[24, 24]}>
                <Welcome />
                <Col  style={{height: '400px' , margin: '10px' , width : '750px'}}>
                    <Header />
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col  style={{height: '200px' , margin: '10px' , width : '550px'}}>
                   <CustomTable isRank={true} data={[]}  />
                </Col>
                <Col  style={{borderRadius: '8px',backgroundColor : '#22262c' ,border: "solid 2px rgba(255, 255, 255, 0.2)", padding: "1px" , height: '200px' , margin: '10px' , width : '550px' , boxShadow: '2px 2px 4px rgba(34, 38, 44, 0.5)'}}>
                    <Chat />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default Layout;