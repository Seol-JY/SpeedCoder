
export default function Text(props) {
    const text = "def soultion(m, n, board):\n    board = [list(i) for i in board]\n    answer = 0\n    while True:\n        chk = [[0] * n for _ in range(m-1)]\n        for i in range(m-1):\n            for j in range(n-1):\n                if board[i][j] != '*':\n                    if board[i][j] == board[i][j+1] and board[i][j] == board[i+1][j]:\n                         chk[i][j] = chk[i][j+1] = chk[i+1][j] = chk[i+1][j+1] = 1\n        ranswer = 0\n        for i in range(m):\n            for j in range(n):\n                if chk[i][j]:\n                    ranswer+=1\n                    board[i][j] = '*'\n        for i in range(m-1,-1,-1):\n            for j in range(n-1,-1,-1):\n                if board[i][j] == '*':\n                    for k in range(i - 1, -1, -1):\n                        if board[k][j] != '*':\n                            board[k][j], board[i][j] = board[i][j], board[k][j]\n                            break\n    return answer";
    const textSplit = text.split('');
    const user = props.userInput;
    const userSplit = user.split(''); 

    const chk = (w,c)=>{
        const strw = w.toString().padStart(3, '0')
        props.setWrongchr(strw);
        props.setCorrect(c);
    }

    let wrong = 0;
    let correct = 0;

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
                    return <pre key={i} style={{display: "inline", backgroundColor: color, color: colortxt}}>{s}</pre>
                })
            }
            {
                chk(wrong,correct)
            }
        </div>
    )
  }

