const getFilecontents = (filename) =>{
   switch (filename) {
        case "sample1.py":
           return { 
           content: ("def solution(m, n, board):\n    board = [list(i) for i in board]\n    answer = 0\n    while True:\n        chk = [[0] * n for _ in range(m-1)]\n        for i in range(m-1):\n            for j in range(n-1):\n                if board[i][j] != '*':\n                    if board[i][j] == board[i][j+1] and board[i][j] == board[i+1][j]:\n                         chk[i][j] = chk[i][j+1] = chk[i+1][j] = chk[i+1][j+1] = 1\n        ranswer = 0\n        for i in range(m):\n            for j in range(n):\n                if chk[i][j]:\n                    ranswer+=1\n                    board[i][j] = '*'\n        for i in range(m-1,-1,-1):\n            for j in range(n-1,-1,-1):\n                if board[i][j] == '*':\n                    for k in range(i - 1, -1, -1):\n                        if board[k][j] != '*':\n                            board[k][j], board[i][j] = board[i][j], board[k][j]\n                            break\n    return answer").split(''),
           colormap: ""
        
            }
        case "sample2.js":
            return {
                content: ("test code\n    hello world\n        fooooooobarrrrrrrbazzzzzzzzzfoooobarrrbazzzz").split(''),
                colormap: ""
            }
        default: return "err"
    }
       
}

export default getFilecontents