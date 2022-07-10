import { useEffect, useRef } from "react";
import setPushData from "../utils/setPushData";

export default function PopupInnerInput({finishTrigger, setFinishTrigger}) {
    const nameInput = useRef();
    const messageInput = useRef();
    
    useEffect(()=>{
        nameInput.current.focus();
    },[])

   //Commit버튼 Getter 함수
   return (
        <ul className='popup-info-ul fade-in'>
            <li><label>Name:<input type="text" ref={nameInput} id="name" name="name" required maxLength="15"></input></label></li>
            <li><label>Message:<input type="text" ref={messageInput} id="message" name="message" required maxLength="25"></input></label></li>
            <div>
                <button onClick={()=>{setFinishTrigger(-1)}}>Cancel</button>
                <button onClick={()=>{setPushData(finishTrigger.toString(), nameInput.current.value, messageInput.current.value) && setFinishTrigger(-1)}}> Push </button>
            </div>
        </ul>
    )
}