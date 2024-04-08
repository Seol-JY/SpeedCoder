import Text from "./Text";
import { useEffect, useState } from "react";
import getFilecontents from "../utils/filecontents";

export default function Editor({
  file,
  fileLength,
  setFileLength,
  section,
  daynight,
  finishTrigger,
}) {
  const [userInput, setUserInput] = useState("");
  const [fileForCompare, setFileForCompare] = useState();
  const [sectionForCompare, setSectionForCompare] = useState();
  const [useAutoComplete, setUseAutoComplete] = useState(false);
  const [autoWord, setAutoWord] = useState([]);
  const [keyEvent, setKeyEvent] = useState("");
  const [autoEnter, setAutoEnter] = useState(false);
  const [textSplit, setTextSplit] = useState([]);

  useEffect(() => {
    setTextSplit(getFilecontents(file).content);
    if (fileForCompare !== file) {
      // 파일 변경 시 내용 초기화
      setFileForCompare(file);
      setUserInput("");
    }
    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    // 자동완성 판정 부분
    const regex = /[a-zA-Z]/;
    let autoStop = userInput.length - 1;
    let starr = [];

    while (autoStop >= 0 && regex.test(userInput[autoStop])) {
      starr.unshift(userInput[autoStop]);
      autoStop--;
    }

    setAutoWord(starr);
    setUseAutoComplete(starr.length > 0);
  }, [userInput]);

  const userInputTabHandler = (event) => {
    // todo: 조건식 최적화
    //tab을 공백4칸으로
    if (event.key === "Escape") {
      setUseAutoComplete(false);
    } else if (
      (event.key === "Enter" || event.key === "Tab") &&
      useAutoComplete
    ) {
      event.preventDefault();
      setAutoEnter(true);
      setUseAutoComplete(false);
    } else if (event.key === "Enter") {
      // 줄바꿈 후 자동 들여쓰기
      event.preventDefault();
      let spaceCount = 0;
      if (textSplit[userInput.length] === "\n") {
        for (let i = 1; i < fileLength; i++) {
          if (textSplit[userInput.length + i] === " ") {
            spaceCount++;
          } else break;
        }
      }
      setUserInput(userInput + "\n" + " ".repeat(spaceCount));
    } else if (event.key === "Tab") {
      event.preventDefault();
      setUserInput(userInput + "    ");
    } else if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();
      if (useAutoComplete) {
        if (event.key === "ArrowUp") {
          setKeyEvent("ArrowUp");
        } else if (event.key === "ArrowDown") {
          setKeyEvent("ArrowDown");
        }
      } else {
        setKeyEvent("");
      }
    } else {
      //setUseAutoComplete(true);
      setKeyEvent("");
    }
  };

  const userInputHandler = (event) => {
    //input창 내용을 userinput에 반영
    const previousValue = userInput; // 직전 값 저장
    setUserInput(event.currentTarget.value); // replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
    if (event.currentTarget.value.length - previousValue.length > 2) {
      alert("Careful. This might not do what you think, 잘못된 접근입니다.");
      window.location.reload();
    }
  };

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
  return file !== "Ranking" ? (
    <div className="editor" onClick={focus}>
      <div className="numbering">
        {Array.from({ length: 26 }, (_, i) => (
          <div key={i + 1}>{i + 1}</div>
        ))}
      </div>
      <textarea
        className="textbox"
        maxLength={fileLength}
        value={userInput}
        onKeyDown={userInputTabHandler}
        onChange={userInputHandler}
      ></textarea>
      <Text
        autoEnter={autoEnter}
        setAutoEnter={setAutoEnter}
        setUseAutoComplete={setUseAutoComplete}
        keyEvent={keyEvent}
        setKeyEvent={setKeyEvent}
        autoWord={autoWord}
        useAutoComplete={useAutoComplete}
        userInput={userInput}
        setUserInput={setUserInput}
        file={file}
        setFileLength={setFileLength}
        daynight={daynight}
      />
    </div>
  ) : (
    <div className="editor" style={{ fontSize: "60px", color: "gray" }}>
      <br />
      <br />
      <br />
      <br />
      Press Explorer to play.
    </div>
  );
}
