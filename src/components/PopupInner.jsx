import React from 'react'
import { useState, useEffect } from 'react'
import Draggable from "react-draggable";
import useInterval from '../hooks/useInterval'
import PopupInnerInput from './PopupInnerInput';

export default function PopupInner({finishTrigger, setFinishTrigger}) {
    // eslint-disable-next-line
    const [position, setPosition] = useState({ x: 0, y: 0 }); 
    const [animation, setAnimation] = useState("slide-in-blurred-bl");
    const [displayCpm, setDisplayCpm] = useState(0);
    const [calcNow, setCalcNow] = useState(finishTrigger);
    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y }); 
    };

    useEffect(()=> {
        setTimeout(() => {
            setAnimation("");
        }, 380);
    },[])

    useInterval(() => {
        setDisplayCpm(Math.ceil(finishTrigger - calcNow));
        setCalcNow(calcNow-calcNow/10);
    }, calcNow<0.006||animation==="slide-in-blurred-bl"?null:30)

    return (
        <Draggable onDrag={(e, data) => trackPos(data)} >
            <div className={`popup-inner ${animation} `}>
                <ul className='circlewrapper' onClick={()=>{setFinishTrigger(-1)}}>
                    <li className='circle'><div></div></li>
                    <li className='circle'><div></div></li>
                    <li className='circle'><div></div></li>
                </ul>
                <div className='popup-inner-contents'>
                    <div className="popup-inner-contents-info">
                        <p>{String(displayCpm).padStart(4,'0')}</p>
                        <p>/cpm</p>
                    </div>
                    {calcNow<0.2  && <PopupInnerInput finishTrigger={finishTrigger} setFinishTrigger={setFinishTrigger}/>}
                </div>
            </div>
        </Draggable>
    )
}

