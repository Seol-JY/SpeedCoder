import React from 'react'
import PopupInner from "./PopupInner";

export default function Popup({file, finishTrigger, setFinishTrigger}) {
    return (finishTrigger!==-1) ? (
            <div className='popup fade-in'>
                <PopupInner file={file} finishTrigger={finishTrigger} setFinishTrigger={setFinishTrigger}/>
            </div>
    ) : "";
}