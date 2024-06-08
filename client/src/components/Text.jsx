import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCorrectchr } from "../redux/correct/actions";
import { setWrongchr } from "../redux/wrong/actions";
import { setSpacechr } from "../redux/space/actions";
import getFilecontents from "../utils/filecontents";
import AutoCompletion from "./AutoCompletion";

function Text(props) {
  //const colormap = file.colormap
  const [textSplit, setTextSplit] = useState([]);
  const [themeColor, setThemeColor] = useState("");
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
