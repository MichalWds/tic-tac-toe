import React from 'react';
import Board from "./Board";



export default function Game() {
    const moveInformation = "Next move will be player O"
    const listOfMoves = (
        <li>
            <button> Start</button>
        </li>
    )
    return (
        <div>
            <div className="board-game">
                <Board> </Board>
            </div>

                <div className="info-game">
                    <div>{moveInformation}</div>
                    <ul>{listOfMoves}</ul>
                </div>
        </div>
    )
}