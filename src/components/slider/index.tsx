import React from "react";
import type { SliderMarks } from 'antd/es/slider';
import './style.css';
import {Slider} from "antd";

const marks: SliderMarks = {
    1: {
        style: {
            color: '#f50',
            marginTop : '7px'
        },
        label: <strong>1x</strong>,
    },
    25: {
        style: {
            color: '#f50',
            marginTop : '7px'
        },
        label: <strong>2x</strong>,
    },
    50: {
        style: {
            color: '#f50',
            marginTop : '7px'
        },
        label: <strong>3x</strong>,
    },
    75: {
        style: {
            color: '#f50',
            marginTop : '7px'
        },
        label: <strong>4x</strong>,
    },
    100: {
        style: {
            color: '#f50',
            marginTop : '7px'
        },
        label: <strong>5x</strong>,
    },
};

const SliderComponent = () => {
    
    return (
        <div>
            <Slider marks={marks} step={null} defaultValue={37} />
        </div>
    )
};

export default SliderComponent;