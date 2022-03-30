import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { connect } from 'react-redux'

function Debug({filestate, Correctchr, Wrongchr}) {
  const [count, setCount] = useState(0);
  const [cpm,setCpm] = useState("0000");
  const [fs, sFs] = useState("sample1.py");
  const dpWrongchr = String(Wrongchr).padStart(3,'0');

  const speed = () =>{    // 타자속도 지정함수
      let sp = Math.floor((60/count)*Correctchr)
      if (sp===Infinity || isNaN(sp)){return 0}
      return sp
  }

  if (filestate!==fs) { // 파일변경 시 타이머 초기화
    sFs(filestate);
    setCount(0);
  }

  useInterval(() => {     // useInterval custom Hook
      setCount(count + 0.1);
      
      setCpm(String(speed()).padStart(4,'0'));
      }, (Wrongchr+Correctchr?100:null));     // Hook 실행조건
  
  return(                                 // 타자속도, 틀린글자수 Display
  <div className="sidebarsection-debug">
      <p>{cpm}</p>
      <p>/cpm</p>
      <p>ERROR:</p>
      <p className={Wrongchr?"onwrong":"wrong"}>{dpWrongchr}</p>
  </div>)
    
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
        Wrongchr: state.wrong.Wrongchr
    }
}
export default connect(mapStateToProps)(Debug) 