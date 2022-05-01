import React, {useReducer} from 'react';
import Board from "./Board";


export default function Game() {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'GOTO':
                return {
                    ...state,
                    xIsNext: action.payload.step % 2 == 0, //
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
        xIsNext: true,
        history: [{squares: Array(9).fill(null)}],
    });
    const {xIsNext, history} = state;

    //go to specific move in history
    const goTo = (step) => {
        dispatch({type: 'GOTO', payload: {step}});
    }

    const handleClick = (squareIndex) => {
        //last item in history
        const current = history [history.length - 1];

        //copy of squares in variable Squares  // slice create new string
        const Squares = current.squares.slice();

        const winner = calculateWinner(Squares);
        //if winner or square is taken then finish
        if (winner || Squares[squareIndex]) {
            return;
        }
        // fill square with given index with X or O
        Squares[squareIndex] = xIsNext ? 'X' : 'O';
        dispatch({type: 'MOVE', payload: {Squares}});
        //curly because it point to squares: action.payload.squares
    }

    const current = history [history.length - 1];
    const winner = calculateWinner(current.Squares);

    const gameStatus = winner
        ? winner == 'D'
            ? 'Draw'
            : "Winner is" + winner
        : "Next move belongs to player " + (xIsNext ? 'X' : 'O')
    //step = element inside history , move = index of this array
    const listOfMoves = history.map((step, move) => {
        const description = move ? 'Go to step: ' + move : "Start the Game";  //go to step number or start the game
        return <li key={move}>
            <button onClick={() => goTo(move)}>
                {description}
            </button>
        </li>
    });

    const Squares = Array(9).fill(null);


    return (
        <div className="game">
            <div className="board-game">
                <Board squares={Squares}> </Board>
            </div>

            <div className="info-game">
                <div className="status"> {gameStatus}</div>
                <ul>{listOfMoves}</ul>
            </div>
        </div>
    )
}
/*
  todo create calculate winner method to calculate the winner. Prepare array of winning scenarios
   */
const calculateWinner = (squares) => {
    return null;
}