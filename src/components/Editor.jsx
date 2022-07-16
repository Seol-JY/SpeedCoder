import Text from "./Text"
import { useEffect, useState } from 'react'

export default function Editor({file, fileLength, setFileLength, section, daynight, finishTrigger}) {

  const [userInput, setuserInput] = useState("");
  const [fileForCompare, setFileForCompare] = useState();
  const [sectionForCompare,setSectionForCompare] = useState();

  const userInputTabHandler = (event) => {  //tab을 공백4칸으로
    if (event.key === 'Tab') {
        event.preventDefault();
        setuserInput(userInput + '    ');
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
  }

  const userInputHandler = (event) => {    //input창 내용을 userinput에 반영
    setuserInput(event.currentTarget.value);   // replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
  }
  useEffect(()=>{
    if (fileForCompare!==file){  // 파일 변경 시 내용 초기화
      setFileForCompare(file);
      setuserInput("");
    }
    // eslint-disable-next-line
  }, [file])

  useEffect(()=>{
    if (sectionForCompare !== section){  // Section 변경 시 내용 초기화
      setSectionForCompare(section);
      setuserInput("");
    } 
    // eslint-disable-next-line
  }, [section]);
  
  useEffect(()=>{                     // finishTrigger 변경 시 trigger가 -1이면 내용 초기화
    if (finishTrigger===-1) {
      setuserInput("");
    }
  },[finishTrigger])

  const focus = () => {                     //textbox로 focus이동
    document.querySelector(".textbox").focus();
  }
  return ((file!=="Ranking")?
    <div className="editor" onClick={focus}>
      <div className="numbering">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20<br/>21<br/>22<br/>23<br/>24<br/>25<br/>26</div>
      <textarea  className="textbox" maxLength={fileLength} value={userInput} onKeyDown={userInputTabHandler} onChange={userInputHandler}></textarea>
      <Text userInput={userInput} file = {file} setFileLength = {setFileLength} daynight={daynight} />
    </div>
  :<div className="editor" style={{fontSize:"60px", color:"gray"}}><br/><br/><br/>You did your Best!<br/><br/>Press Explorer to play.</div>)
}
  