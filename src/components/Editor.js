import Text from "./Text"
import { useState } from 'react'
import { getElementError } from "@testing-library/react";

export default function Editor(props) {

  const [userInput, setuserInput] = useState("");
  const [time, setTime] = useState(0);
  const [correct, setCorrect] = useState(0);

  const userInputTabHandler = (event) => {
    if (event.key === 'Tab') {
        event.preventDefault();
        setuserInput(userInput + '    ');
    }
  }

  const userInputHandler = (event) => {
    setuserInput(event.currentTarget.value);
    if (event.currentTarget.value.length === 1){
      setTime(Math.floor(+ new Date() / 100));
      console.log(Math.floor(+ new Date() / 100));
    }
    console.log(correct);
  }
  
  const focus = () => {
    document.querySelector(".textbox").focus();
  }

    return (
      <div className="editor" onClick={focus}>
        <div className="numbering">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20<br/>21<br/>22<br/>23<br/>24<br/>25<br/>26</div>
        <textarea className="textbox" value={userInput} onKeyDown={userInputTabHandler} onChange={userInputHandler}></textarea>
        <Text userInput={userInput} setCpm={props.setCpm} setWrongchr={props.setWrongchr} setCorrect={setCorrect}/>
      </div>
    )
}

