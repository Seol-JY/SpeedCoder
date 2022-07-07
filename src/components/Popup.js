import React from 'react'
import PopupInner from "./PopupInner";

export default function Popup({finishTrigger, setFinishTrigger}) {
    return (finishTrigger!==-1) ? (
            <div className='popup fade-in'>
                <PopupInner finishTrigger={finishTrigger} setFinishTrigger={setFinishTrigger}/>
            </div>
    ) : "";


}