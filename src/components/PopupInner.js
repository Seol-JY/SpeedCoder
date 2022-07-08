import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Draggable from "react-draggable";

export default function PopupInner({finishTrigger, setFinishTrigger}) {
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
    }, calcNow<0.001||animation==="slide-in-blurred-bl"?null:30)
    

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
                    {calcNow<1 && 
                        <ul className='popup-info-ul fade-in'>
                            <li><label for="name">Name:</label></li>
                            <li><input type="text" id="name" name="name" required maxlength="15" size="10"></input></li>
                            <li><label for="message">Message:</label></li>
                            <li><input type="text" id="message" name="message" required maxlength="25" size="10"></input></li>
                        </ul>
                    }
                </div>
            </div>
        </Draggable>
    )
}
function useInterval(callback, delay) {         // useInterval Custom Hook 선언
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}