import React, {useReducer} from 'react';
import Board from "./Board";



export default function Game() {

    const reducer = (state, action) => {
        switch (action.type){
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
    const [state, dispatch] = useReducer( reducer, {
        xIsNext: true,
        history: [{squares: Array(9).fill(null)}],
    });
    const {xIsNext, history} = state;

    const handleClick = (squareIndex) => {
        //last item in history
        const current = history [history.length -1];

        //copy of squares in variable Squares  // slice create new string
        const Squares = current.squares.slice();

        const winner = calculateWinner(Squares);
    }

    /*
    todo create calculate winner method to calculate the winner. Prepare array of winning scenarios
     */
    const calculateWinner = (squares) => {
        return null;
    }

    const moveInformation = "Next move will be player O"
    const listOfMoves = (
        <li>
            <button> Start</button>
        </li>
    )

    const Squares =  Array(9).fill(null);


    return (
        <div className="game">
            <div className="board-game">
                <Board squares={Squares}> </Board>
            </div>

                <div className="info-game">
                    <div className="status"> {moveInformation}</div>
                    <ul>{listOfMoves}</ul>
                </div>
        </div>
    )
}