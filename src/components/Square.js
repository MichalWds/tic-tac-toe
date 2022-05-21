import React from 'react';
import swal from 'sweetalert';
import alert from '../resources/alert.wav'

export default function Square(props) {

    const alertP = new Audio(alert)

    const clickAlert = () => {
        alertP.play()
    }

    const isTaken = () => {
        if (!props.value) {
            props.onClick();
        } else {
            clickAlert();
            swal("This place is taken.");
        }
    }
    return (
        <button className="button" onClick={isTaken}>
            {props.value}
        </button>
    )
}