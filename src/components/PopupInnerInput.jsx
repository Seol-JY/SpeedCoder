import { useEffect, useRef } from "react";
import localStore from "../utils/localStore";
import fetcher from "../utils/fetcher";
import { connect } from 'react-redux'

function PopupInnerInput({file, finishTrigger, setFinishTrigger, Correctchr, Wrongchr}) {
    const nameInput = useRef();
    const messageInput = useRef();

   //Commit버튼 Getter 함수
   return (
        <ul className='popup-info-ul fade-in'>
            <li><label>Name:<input type="text" ref={nameInput} id="name" name="name" required maxLength="15"></input></label></li>
            <li><label>Message:<input type="text" ref={messageInput} id="message" name="message" required maxLength="25"></input></label></li>
            <div>
                <button onClick={()=>{setFinishTrigger(-1)}}>Cancel</button>
                {/* localStore.insertData(file, finishTrigger, nameInput.current.value, messageInput.current.value, Correctchr, Wrongchr) */}
                <button onClick={ ()=>{ fetcher.save(file, finishTrigger, nameInput.current.value, messageInput.current.value, Correctchr, Wrongchr, (bool)=>{if(bool) setFinishTrigger(-1 );})}}> Push </button>
            </div>
        </ul>
    )
}

const mapStateToProps = (state) => {        // Redux  구문
    return {    
        Correctchr: state.correct.Correctchr,
        Wrongchr: state.wrong.Wrongchr,
    }
  }
  
  export default connect(mapStateToProps)(PopupInnerInput) 