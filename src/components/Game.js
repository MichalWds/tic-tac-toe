import React from 'react';
import Board from "./Board";



export default function Game() {
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