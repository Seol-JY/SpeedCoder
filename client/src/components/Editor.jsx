import Text from "./Text"
import { useEffect, useState } from 'react'

export default function Editor({file, fileLength, setFileLength, section, daynight, finishTrigger}) {

  const [userInput, setUserInput] = useState("");
  const [fileForCompare, setFileForCompare] = useState();
  const [sectionForCompare, setSectionForCompare] = useState();
  const [useAutoComplete, setUseAutoComplete] = useState(false);
  const [autoWord, setAutoWord] = useState([]);
  const [autoIndex, setAutoIndex] = useState(0);
  const [autoEnter, setAutoEnter] = useState(false);

  useEffect(() => { // 자동완성 판정 부분
    const regex = /[a-z|A-Z]/;
    let autoStop = userInput.length-1;
    let starr=[];
    while(regex.test(userInput[autoStop]) && autoStop>-1) {
      starr.unshift(userInput[autoStop]);
      autoStop--;
    }
    setAutoWord(starr);
    if (starr.length===0) {setUseAutoComplete(false)}
  }, [userInput])

  const userInputTabHandler = (event) => { // todo: 조건식 최적화
    //tab을 공백4칸으로
    if (event.key === "Escape") {
      setUseAutoComplete(false);
    }
    else if (event.key === "Enter" && useAutoComplete) {
      event.preventDefault();
      setAutoEnter(true);
      setUseAutoComplete(false);
      setAutoIndex(0);
    }
    else if (event.key === "Tab") {
      event.preventDefault();
      setUserInput(userInput + "    ");
    }
    else if (event.key === "ArrowRight" || event.key === "ArrowUp" || event.key ==="ArrowDown") {
      event.preventDefault();  //todo: 인덱스 범위 out 처리 해야함
      if(useAutoComplete) {
        if (event.key === "ArrowUp") {
          setAutoIndex(autoIndex-1);
        } else if (event.key === "ArrowDown") {
          setAutoIndex(autoIndex+1);
        }
      } else {
        setAutoIndex(0);
      }
    }
    else {
      setUseAutoComplete(true)
      setAutoIndex(0);
    }
  };

  const userInputHandler = (event) => {
    //input창 내용을 userinput에 반영
    setUserInput(event.currentTarget.value); // replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
  };
  
  useEffect(() => {
    if (fileForCompare !== file) {
      // 파일 변경 시 내용 초기화
      setFileForCompare(file);
      setUserInput("");
    }
    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    if (sectionForCompare !== section) {
      // Section 변경 시 내용 초기화
      setSectionForCompare(section);
      setUserInput("");
    }
    // eslint-disable-next-line
  }, [section]);

  useEffect(() => {
    // finishTrigger 변경 시 trigger가 -1이면 내용 초기화
    if (finishTrigger === -1) {
      setUserInput("");
    }
  }, [finishTrigger]);

  const focus = () => {
    //textbox로 focus이동
    document.querySelector(".textbox").focus();
  };
  return ((file!=="Ranking")?
    <div className="editor" onClick={focus}>
      <div className="numbering">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20<br/>21<br/>22<br/>23<br/>24<br/>25<br/>26</div>
      <textarea  className="textbox" maxLength={fileLength} value={userInput} onKeyDown={userInputTabHandler} onChange={userInputHandler}></textarea>
      <Text autoEnter={autoEnter} setAutoEnter={setAutoEnter} setUseAutoComplete={setUseAutoComplete} autoIndex={autoIndex} autoWord={autoWord} useAutoComplete={useAutoComplete} userInput={userInput} setUserInput = {setUserInput} file = {file} setFileLength = {setFileLength} daynight={daynight} />
    </div>
  :<div className="editor" style={{fontSize:"60px", color:"gray"}}><br/><br/><br/>You did your Best!<br/><br/>Press Explorer to play.</div>)
}
  