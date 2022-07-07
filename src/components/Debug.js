import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { connect } from 'react-redux'

function Debug({filestate, Correctchr, Wrongchr, fileLength, setFinishTrigger}) {
  const [count, setCount] = useState(0);
  const [cpm,setCpm] = useState("0000");
  const [terval, setTerval] = useState(null);
  const dpWrongchr = String(Wrongchr).padStart(3,'0');

  const speed = () =>{    // 타자속도 지정함수
      let sp = Math.floor((60/count)*Correctchr)
      if (sp===Infinity || isNaN(sp)){return 0}
      return sp
  }

  useEffect(()=>{  // 파일변경 감지 시 cpm 초기화
    setCount(0);
    setCpm("0000");
  },[filestate, fileLength])

  useEffect(()=>{   
    if (!(Wrongchr+Correctchr)) {
      setTerval(null);
      setCount(0);
      setCpm("0000");
    } else {
      setTerval(50);
      if ((Correctchr+Wrongchr)===fileLength) {          //완료조건
        setFinishTrigger(parseInt(cpm));    //종료 트리거
        setTerval(null);
        setCount(0);
        setCpm("0000");
      }
    }
  }, [Correctchr, Wrongchr])

  useInterval(() => {     // useInterval custom Hook
      setCount(count + 0.05);    //0.05씩 UPDATE
      setCpm(String(speed()).padStart(4,'0'));
  }, terval);     // Hook 실행조건, terval은 밀리초단위

  return (                                 // 타자속도, 틀린글자수 Display
    <div className="sidebarsection-debug">
      <p>{cpm}</p>
      <p>/cpm</p>
      <p>ERROR:</p>
      <p className={Wrongchr?"onwrong":"wrong"}>{dpWrongchr}</p>
    </div>
  )
}

function useInterval(callback, delay) {         // useInterval Custom Hook 선언
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const mapStateToProps = (state) => {        // Redux  구문
    return {    
        Correctchr: state.correct.Correctchr,
        Wrongchr: state.wrong.Wrongchr,
    }
}

export default connect(mapStateToProps)(Debug) 