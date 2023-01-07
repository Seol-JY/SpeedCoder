import { useState, useEffect } from "react";
import { connect } from "react-redux";
import useInterval from "../hooks/useInterval";
import speed from "../utils/speed";

function Debug({
  filestate,
  Correctchr,
  Wrongchr,
  fileLength,
  setFinishTrigger,
}) {
  const [count, setCount] = useState(0);
  const [cpm, setCpm] = useState("0000");
  const [terval, setTerval] = useState(null);
  const dpWrongchr = String(Wrongchr).padStart(3, "0");

  useEffect(() => {
    // 파일변경 감지 시 cpm 초기화
    setCount(0);
    setCpm("0000");
  }, [filestate, fileLength]);

  useEffect(() => {
    if (!(Wrongchr + Correctchr)) {
      // 입력값이 없어지면 cpm 초기화
      setTerval(null);
      setCount(0);
      setCpm("0000");
    } else {
      setTerval(50);
      if (Correctchr + Wrongchr === fileLength) {
        //완료 조건
        setFinishTrigger(parseInt(cpm)); //종료 트리거
        setTerval(null);
        setCount(0);
        setCpm("0000");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Correctchr, Wrongchr]);

  useInterval(() => {
    // useInterval custom Hook
    setCount(count + 0.05); //0.05씩 UPDATE
    setCpm(String(speed(count, Correctchr)).padStart(4, "0"));
  }, terval); // Hook 실행조건, terval은 밀리초단위

  return (
    // 타자속도, 틀린글자수 Display
    <div className="sidebarsection-debug">
      <p>{cpm}</p>
      <p>/cpm</p>
      <p>ERROR:</p>
      <p className={Wrongchr ? "onwrong" : "wrong"}>{dpWrongchr}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  // Redux  구문
  return {
    Correctchr: state.correct.Correctchr,
    Wrongchr: state.wrong.Wrongchr,
  };
};

export default connect(mapStateToProps)(Debug);
