import React, {useReducer} from 'react';
import Board from "./Board";
import {Redirect, useHistory} from "react-router-dom";

export default function Game({authorized}) {

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
        history: JSON.parse(localStorage.getItem('history')),
    });
    // history: [{squares: Array(9).fill(null)}],
    //JSON.parse(localStorage.getItem('history'))

    const {xIsNext, history} = state;
    localStorage.setItem("turn", JSON.stringify(xIsNext))
    localStorage.setItem("history", JSON.stringify(history))

    // if(state.history === null){
    //      state.history= [{squares: Array(9).fill(null)}]
    // }
    //go to specific move in history
    const goTo = (step) => {
        dispatch({type: 'GOTO', payload: {step}});
    }

    const handleClick = (squareIndex) => {
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
        squares[squareIndex] = xIsNext ? '🔵' : '❌';
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
            ? 'Draw'
            : "Winner is" + winner
        : "Next move belongs to player " + (turn ? localStorage.getItem("playerOne") + "🔵" : localStorage.getItem("playerTwo") + '❌')
    //step = element inside history , move = index of this array
    const listOfMoves = history.map((step, move) => {
        const description = move ? 'Go to step: ' + move : "Start the same Game";  //go to step number or start the game
        return <li key={move}>
            <button onClick={() => goTo(move)}>
                {description}
            </button>
        </li>
    });

    if (!authorized) {
        return <Redirect to="/"/>
    }
    const routeChange = () =>{
        let path = `/`;
        hist.push(path);
        window. location. reload();
        window. localStorage.clear();
    }

    return (
        <div className="game">
            <div className="board-game">
                {/*current squares takes it from history and history take it from state*/}
                <Board onClick={(i) => handleClick(i)} squares={current.squares}> </Board>
            </div>
            <div className="info-game">
                <div className="status"> {gameStatus}</div>
                <ul>{listOfMoves}</ul>
            </div>
            <button color="primary" className="button"
                    onClick={routeChange}
            >
                Start new game (login page)
            </button>
        </div>
    )
}

const calculateWinner = (squares) => {
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
            return squares[a];
        }
        if (!squares[a] || !squares[b] || !squares[c]) {
            isDraw = false;
        }
    }
    if (isDraw) return 'Draw';
    return null;
}