import React, {useReducer} from 'react';
import Board from "./Board";
import {Redirect, useHistory} from "react-router-dom";
import win from '../resources/win.wav'
import click from '../resources/click.wav'
import draw from '../resources/draw.wav'
import back from '../resources/backStep.wav'

export default function Game({authorized}) {

    const clickP = new Audio(click)
    const backP = new Audio(back)

    const clickPlay = () => {
        clickP.play()
    }

    const clickBack = () => {
        backP.play()
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'GOTO':
                return {
                    ...state,
                    xIsNext: action.payload.step % 2 === 0, //
                    history: state.history.slice(0, action.payload.step + 1) // removing next step from history to this one
                };
            case 'MOVE':
                return {
                    ...state, history: state.history.concat({
                        squares: action.payload.squares
                    }),
                    xIsNext: !state.xIsNext,
                };
            default:
                return state;
        }
    };
   const [state, dispatch] = useReducer(reducer, {
        xIsNext: JSON.parse(localStorage.getItem('turn')),
        history: JSON.parse(localStorage.getItem('history'))
    });
    // history: [{squares: Array(9).fill(null)}]

    const {xIsNext, history} = state;
    localStorage.setItem("turn", JSON.stringify(xIsNext))
    localStorage.setItem("history", JSON.stringify(history))

    const goTo = (step) => {
        clickBack();
        dispatch({type: 'GOTO', payload: {step}});
    }

    const handleClick = (squareIndex) => {
        clickPlay();
        //last item in history
        const current = history[history.length - 1];

        //copy of squares in variable Squares  // slice create new string
        const squares = current.squares.slice();

        const winner = calculateWinner(squares);
        //if winner or square is taken then finish
        if (winner || squares[squareIndex]) {
            return;
        }
        // fill square with given index with X or O
        squares[squareIndex] = xIsNext ? '❌' : '🔵';
        dispatch({type: 'MOVE', payload: {squares}});
        //curly because it point to squares: action.payload.squares
    }

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    //whose turn is it
    const turn = JSON.parse(localStorage.getItem('turn'))

    //navigate to login page
    const hist = useHistory();

    const gameStatus = winner
        ? winner === 'Draw'
            ? "It's a DRAW!"
            : "Winner is  " + winner
        : "Next move belongs to player " + (turn ? localStorage.getItem("playerOne") + ":  ❌" : localStorage.getItem("playerTwo") + ":  🔵")
    //step = element inside history , move = index of this array
    const listOfMoves = history.map((step, move) => {
        const description = move ? 'Go to step: ' + move : "Start the same Game";  //go to step number or start the game
        return <li key={move}  >
            <button onClick={() => goTo(move)} className="button-list">
                {description}
            </button>
        </li>
    });

    if (!authorized) {
        return <Redirect to="/"/>
    }

    const routeChange = () =>{
        hist.push("/");
        const resetBoard =  [{squares: Array(9).fill(null)}];

        window. location. reload();
        window. localStorage.clear();
        localStorage.setItem("history", JSON.stringify(resetBoard))
        localStorage.setItem("turn", JSON.stringify(true))
    }

    return (
        <div className="game">

            <div className="board-game">
                {/*current squares takes it from history and history take it from state*/}
                <Board onClick={(i) => handleClick(i)} squares={current.squares}> </Board>
            </div>

            <div className="info-game">
                <div className="game-status"> {gameStatus}</div>
                <ul>{listOfMoves}</ul>
            </div>

            <button color="primary" className="button-login" onClick={routeChange}>
                START NEW GAME!
            </button>
        </div>
    )
}

const calculateWinner = (squares) => {
    const drawP = new Audio(draw)
    const winP = new Audio(win)

    const clickDraw = () => {
        drawP.play()
    }
    const clickWin = () => {
        winP.play()
    }

    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let isDraw = true;
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            clickWin();
            return squares[a];
        }
        if (!squares[a] || !squares[b] || !squares[c]) {
            isDraw = false;
        }
    }
    if (isDraw) {
        clickDraw();
        return 'Draw';
    }
    return null;
}