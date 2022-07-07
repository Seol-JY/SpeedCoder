import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Draggable from "react-draggable";

export default function PopupInner({finishTrigger, setFinishTrigger}) {
    const [position, setPosition] = useState({ x: 0, y: 0 }); 
    const [animation, setAnimation] = useState("slide-in-blurred-bl");
    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y }); 
    };   
    useEffect(()=> {
        setTimeout(() => {
            setAnimation("");
        }, 600);
    },[])
    return (
        <Draggable onDrag={(e, data) => trackPos(data)} >
            <div className={`popup-inner ${animation} `}>
                {finishTrigger}
                <button onClick={()=>{setFinishTrigger(-1)}}>close</button>
            </div>
        </Draggable>
    )
}