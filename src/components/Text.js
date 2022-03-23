import { useEffect, useState } from 'react'
import { connect, dispatch } from 'react-redux'
import { setCorrectchr } from '../redux/correct/actions'
import {setWrongchr} from '../redux/wrong/actions'

function Text(props) {

    const text = "def soultion(m, n, board):\n    board = [list(i) for i in board]\n    answer = 0\n    while True:\n        chk = [[0] * n for _ in range(m-1)]\n        for i in range(m-1):\n            for j in range(n-1):\n                if board[i][j] != '*':\n                    if board[i][j] == board[i][j+1] and board[i][j] == board[i+1][j]:\n                         chk[i][j] = chk[i][j+1] = chk[i+1][j] = chk[i+1][j+1] = 1\n        ranswer = 0\n        for i in range(m):\n            for j in range(n):\n                if chk[i][j]:\n                    ranswer+=1\n                    board[i][j] = '*'\n        for i in range(m-1,-1,-1):\n            for j in range(n-1,-1,-1):\n                if board[i][j] == '*':\n                    for k in range(i - 1, -1, -1):\n                        if board[k][j] != '*':\n                            board[k][j], board[i][j] = board[i][j], board[k][j]\n                            break\n    return answer";
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
