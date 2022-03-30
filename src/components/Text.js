import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setCorrectchr } from '../redux/correct/actions'
import {setWrongchr} from '../redux/wrong/actions'
import getFilecontents from '../filecontents'


function Text(props) {
    const file = getFilecontents(props.file);
    const text = file.content;
    const colormap = file.colormap;
    const textSplit = text.split('');
    const user = props.userInput;
    const userSplit = user.split(''); 

    let wrong = 0, correct = 0;

    useEffect(() => {
        props.setCorrectchr(correct);
        props.setWrongchr(wrong);
    })

    return (
        <div className="textdisplay">
            {
                textSplit.map((s,i) => {
                    let color;
                    let colortxt;
                    if (i < user.length) {
                        if (s === userSplit[i]) {   //correct
                            color = '';
                            colortxt = 'black';
                            correct++;
                        } else {                    //wrong
                            color = '#ff5c5c';
                            colortxt = 'white';
                            wrong++;
                        }
                    }
                    return (user.length===i?<pre key={i} style={{display: "inline", backgroundColor: color, color: colortxt}}><div className="cursor">_</div>{s}</pre>:<pre key={i} style={{display: "inline", backgroundColor: color, color: colortxt}}>{s}</pre>);
                })

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Correctchr: state.correct.Correctchr,
        Wrongchr: state.wrong.Wrongchr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCorrectchr: (cor)=>dispatch(setCorrectchr(cor)),
        setWrongchr: (wr)=>dispatch(setWrongchr(wr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Text)
