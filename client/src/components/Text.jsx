import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCorrectchr } from "../redux/correct/actions";
import { setWrongchr } from "../redux/wrong/actions";
import { setSpacechr } from "../redux/space/actions";
import getFilecontents from "../utils/filecontents";
import AutoCompletion from "./AutoCompletion";

function Text(props) {
  //const colormap = file.colormap
  const bracketClosed = [")", "}", "]", '"', "'", "`"];
  const [textSplit, setTextSplit] = useState([]);
  const [themeColor, setThemeColor] = useState("");
  const [quotePositions, setQuotePositions] = useState([]); // 짝수 번째 따옴표 위치 기록
  let wrong = 0,
    correct = 0,
    space = 0;
  const user = props.userInput;
  const userSplit = user.split("");

  useEffect(() => {
    setTextSplit(getFilecontents(props.file).content);
  }, [props.file]);

  useEffect(() => {
    const len = textSplit.length;
    props.setFileLength(len);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSplit]);

  useEffect(() => {
    const content = getFilecontents(props.file).content;
    setTextSplit(content);

    // 따옴표 위치 미리 계산
    const positions = [];
    let quoteCount = 0;
    for (let i = 0; i < content.length; i++) {
      if (['"', "'", "`"].includes(content[i])) {
        quoteCount++;
        if (quoteCount % 2 === 0) {
          positions.push(i); // 짝수 번째 따옴표 위치 기록
        }
      }
    }
    setQuotePositions(positions);
  }, [props.file]);

  // 자동 괄호 입력 로직
  useEffect(() => {
    if (props.deletionMode) return; // 삭제 모드인 경우 실행하지 않음

    const currentIndex = user.length;
    const nextChar = textSplit[currentIndex]; // 다음에 입력할 위치의 문자

    if (bracketClosed.includes(nextChar)) {
      // 닫히는 괄호인 경우
      if (['"', "'", "`"].includes(nextChar)) {
        // 따옴표인 경우, 짝수 번째 위치인지 확인
        if (quotePositions.includes(currentIndex)) {
          props.setUserInput(user + nextChar);
        }
      } else {
        // 다른 닫히는 괄호인 경우 자동으로 입력
        props.setUserInput(user + nextChar);
      }
    }
  }, [user, textSplit, quotePositions]); // user, textSplit, quotePositions가 변경될 때마다 실행

  useEffect(() => {
    if (props.daynight % 2 === 1) setThemeColor("#585858");
    else setThemeColor("#BEBEBE");
  }, [props.daynight]);

  useEffect(() => {
    props.setCorrectchr(correct);
    props.setWrongchr(wrong);
    props.setSpacechr(space);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div className="textdisplay">
      {textSplit.map((s, i) => {
        let color;
        let colortxt;
        let wrongLineBreak;

        if (i < user.length) {
          if (s === userSplit[i]) {
            //correct (개행시 어떤값이든 PASS)
            color = "";
            colortxt = themeColor;
            correct++;
          } else if (s === "\n" && userSplit[i] !== "\n") {
            wrongLineBreak = true;
            wrong++;
          } else {
            //wrong
            color = "#ff5c5c";
            colortxt = "white";
            wrong++;
            if (userSplit[i] === " " || userSplit[i] === "\n") {
              // 공백이나 개행으로 틀린 경우 속도 패널티 부여
              space++;
            }
          }
        }

        let chr; // 출력할 character(조건에 맞게)
        if (i <= user.length - 1) {
          if (wrongLineBreak) {
            chr = s;
          } else if (userSplit[i] === "\n" && s !== "\n") {
            chr = "↵";
          } else {
            chr = userSplit[i];
          }
        } else {
          chr = s;
        }

        return (
          <pre
            key={i}
            style={{
              display: "inline",
              backgroundColor: color,
              color: colortxt,
            }}
          >
            {user.length === i ? <div className="cursor">│</div> : ""}
            {user.length === i ? (
              <AutoCompletion
                file={props.file}
                autoEnter={props.autoEnter}
                setAutoEnter={props.setAutoEnter}
                useAutoComplete={props.useAutoComplete}
                setUseAutoComplete={props.setUseAutoComplete}
                keyEvent={props.keyEvent}
                setKeyEvent={props.setKeyEvent}
                autoWord={props.autoWord}
                userInput={props.userInput}
                setUserInput={props.setUserInput}
              />
            ) : (
              ""
            )}
            {wrongLineBreak ? <div className="wrong-line-break"></div> : ""}
            {chr}
          </pre>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    Correctchr: state.correct.Correctchr,
    Wrongchr: state.wrong.Wrongchr,
    Spacechr: state.space.Spacechr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCorrectchr: (cor) => dispatch(setCorrectchr(cor)),
    setWrongchr: (wr) => dispatch(setWrongchr(wr)),
    setSpacechr: (sp) => dispatch(setSpacechr(sp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Text);
