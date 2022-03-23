import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'

function Debug(props) {
    const [count, setCount] = useState(0);
    const [cpm,setCpm] = useState(0);
    const Wrongchr = String(props.Wrongchr).padStart(3,'0');
    const setting = ()=>{
        console.log(count);
        setCpm(count);
    }

    if (props.Correctchr+props.Wrongchr===1){
        const timer = setInterval(() => {
            setCount(count +0.5);
            setting();
        }, 500);
    }
    
    return(
    <div className="sidebarsection-debug">
        <p>{cpm}</p>
        <p>/cpm</p>
        <p>ERROR:</p>
        <p>{Wrongchr}</p>
    </div>)
    
}

const mapStateToProps = (state) => {
    return {
        
        Correctchr: state.correct.Correctchr,
        Wrongchr: state.wrong.Wrongchr
    }
}
export default connect(mapStateToProps)(Debug) 