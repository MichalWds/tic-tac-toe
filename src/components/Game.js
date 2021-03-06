import React, {useReducer} from 'react';
import Board from "./Board";
import {Redirect, useHistory} from "react-router-dom";
import click from '../resources/click.wav'
import back from '../resources/backStep.wav'
import {calculateWinner} from './calculateWinner'
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../lib/init-firebase";

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
        squares[squareIndex] = xIsNext ? '???' : '????';
        dispatch({type: 'MOVE', payload: {squares}});
        //curly because it point to squares: action.payload.squares
    }

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    //whose turn is it
    const turn = JSON.parse(localStorage.getItem('turn'))

    //navigate to login page
    const hist = useHistory();

    if(winner==='???'){
        console.log(localStorage.getItem("idOne"))
        console.log(localStorage.getItem("idTwo"))

        const id =localStorage.getItem("idOne");
        let score =JSON.parse(localStorage.getItem('scoreOne'))
        if(!id){
            return
        }
        const docRef = doc(db, 'stats', id )

        localStorage.setItem("scoreOne", score+1);

        updateDoc(docRef, {
            "score": score+1
        }).then(response => {
            console.log(response)
        }).catch(error => error.message);
    }

    if(winner==='????'){

        const id =localStorage.getItem("idTwo");
        let score =JSON.parse(localStorage.getItem('scoreTwo'))
        if(!id){
            return
        }
        const docRef = doc(db, 'stats', id )

        localStorage.setItem("scoreTwo", score+1);

        updateDoc(docRef, {
            "score": score+1
        }).then(response => {
            console.log(response)
        }).catch(error => error.message);
    }

    const gameStatus = winner
        ? winner === 'Draw'
            ? "It's a DRAW!"
            : "Winner is  " + winner
        : "Next move  " + (turn ? localStorage.getItem("playerOne") + ":  ???" : localStorage.getItem("playerTwo") + ":  ????")

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

        window.location.reload();
        window.localStorage.clear();
        localStorage.setItem("history", JSON.stringify(resetBoard))
        localStorage.setItem("turn", JSON.stringify(true))
    }

    const routeStats = () =>{
        hist.push("/stats");
        window.location.reload();
    }

    return (
        <div className="game">

            <div className="board-game">
                <Board onClick={(i) => handleClick(i)} squares={current.squares}> </Board>
            </div>

            <div className="info-game">
                <div className="game-status"> {gameStatus}</div>
                <ul>{listOfMoves}</ul>
            </div>

            <button color="primary" className="button-login" onClick={routeChange}>
                START NEW GAME!
            </button>
            <button color="primary" className="button-stats" onClick={routeStats}>
                STATS
            </button>
        </div>
    )
}