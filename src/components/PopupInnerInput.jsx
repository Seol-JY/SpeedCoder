import { useRef } from "react";
import fetcher from "../utils/fetcher";
import { connect } from 'react-redux'

function PopupInnerInput({file, finishTrigger, setFinishTrigger, Correctchr, Wrongchr}) {
    const nameInput = useRef();
    const messageInput = useRef();

    const send_result = (keycode = "Enter")=>{ if(keycode == "Enter") fetcher.save(file, finishTrigger, nameInput.current.value, messageInput.current.value, Correctchr, Wrongchr, (bool)=>{if(bool) setFinishTrigger(-1 );})}

   //Commit버튼 Getter 함수
   return (
        <ul className='popup-info-ul fade-in'>
            <li><label>Name:<input type="text" ref={nameInput} id="name" name="name" required maxLength="15"></input></label></li>
            <li><label>Message:<input onKeyDown={(e)=>{send_result(e.key); e.preventDefault();}} type="text" ref={messageInput} id="message" name="message" required maxLength="25"></input></label></li>
            <div>
                <button onClick={()=>{setFinishTrigger(-1)}}>Cancel</button>
                {/* localStore.insertData(file, finishTrigger, nameInput.current.value, messageInput.current.value, Correctchr, Wrongchr) */}
                <button onClick={send_result}> Push </button>
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