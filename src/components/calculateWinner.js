import React from 'react';
import draw from "../resources/draw.wav";
import win from "../resources/win.wav";

export const calculateWinner = (squares) => {
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