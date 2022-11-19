import React, { useState } from "react";
import './slider.css';

export default function Slider(){
    const [head, setHead]=useState("Best price on top smart phones");
    const onClickHandler=(e)=>{
        let arr = [
            "Best price on top smart phones",
            "Laptop Upto 70% 0ff",
            "Grocery Upto 10% discount"
        ]
        if(e===0){
            setHead(arr[0]);
        }else if(e===1){
            setHead(arr[1]);
        }else{
            setHead(arr[2]);
        }
    }
    return(
        <div className="slider">
            <h1>{head}</h1>
            <div className="dot">
                <span onClick={()=>onClickHandler(0)}></span>
                <span onClick={()=>onClickHandler(1)}></span>
                <span onClick={()=>onClickHandler(2)}></span>
            </div>
        </div>
    );
}