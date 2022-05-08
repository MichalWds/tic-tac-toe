import React from 'react';

export default function Square(props) {

    const isTaken = () => {
        if (!props.value) {
            props.onClick();
        } else {
            alert("This place is taken.")
        }
    }
    return (
        <button className="button" onClick={isTaken}>
            {props.value}
        </button>
    )
}