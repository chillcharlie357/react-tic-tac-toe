import React, {useState} from 'react';
import './App.css';

function App() {
    const [history, setHistory] =
        useState([Array(9).fill('')]);
    const [currentMove, setCurrentMove] = useState(0);
    const current = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquare: Array<string>) {
        const newHistory =
            [...history.slice(0, currentMove + 1),nextSquare];
        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);
    }

    function jumpTo(step: number) {
        setCurrentMove(step);
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    });
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} status={current} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function Board(props: any) {
    const status = props.status;
    const xIsNext = props.xIsNext;
    const onPlay = props.onPlay;

    const winner = calculateWinner(status);
    let statusText;
    if (winner) {
        statusText = 'Winner: ' + winner;
    } else {
        statusText = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function handleClick(i: number) {
        if (status[i] !== '' || calculateWinner(status)) {
            return;
        }
        const newStatus = status.slice();
        if (xIsNext) {
            newStatus[i] = 'X';
        } else {
            newStatus[i] = 'O';
        }

        onPlay(newStatus);
    }

    return (
        <>
            <div className="status">{statusText}</div>
            {
                Array(3).fill('').map((value, row) => {
                    return (
                        <div className={"board-row"}>
                            {
                                Array(3).fill('').map((value, col) => {
                                    const index = row * 3 + col;
                                    return (
                                        <Square value={status[index]} onSquareClinck={() => handleClick(index)}/>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </>
    );
}

function Square(props: any) {
    const value = props.value;
    const onSquareClick = props.onSquareClinck;

    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinner(status: Array<string>) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [6, 4, 2], [0, 4, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (status[a] && status[a] === status[b] && status[a] === status[c]) {
            return status[a];
        }
    }
    return null;
}

export default App;
