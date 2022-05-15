import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {addDoc, doc, collection, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {statsRef} from "../lib/firestore.collectons";
import {db} from "../lib/init-firebase";

function validate(playerOne, playerTwo, size) {
    const errors = [];

    if (playerOne.length < 5) {
        errors.push('Name of first player should be at least 5 characters long.');
    }

    if (playerTwo.length < 5) {
        errors.push('Name of second player should be at least 5 characters long.');
    }

    if (playerTwo === playerOne) {
        errors.push('Names are the same. Change one to continue.');
    }

    if (size != 9) {
        errors.push('Size has to be equal 9.');
    }

    return errors;
}

export const Forms = () => {
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const [errors, setErrors] = useState([]);
    const [size, setSize] = useState('');
    const [scoreOne, setScoreOne] = useState(0)
    const [idOne, setIdOne] = useState('')
    const [scoreTwo, setScoreTwo] = useState(0)
    const [idTwo, setIdTwo] = useState('')

    let history = useHistory();

    const resetData = (e) => {
        e.preventDefault();
        setPlayerOne('');
        setPlayerTwo('');
        setSize('');
        setErrors([]);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();

        let isError = false;
        const errors = validate(playerOne, playerTwo, size);

        addDoc(statsRef, {
            "player": playerOne,
            "score": scoreOne
        }).then(response => {
            console.log(response)
            setIdOne(response.id)
            setScoreOne(scoreOne)

            localStorage.setItem("idOne", idOne)
            localStorage.setItem("scoreOne", scoreOne )

        }).catch(error => {
            console.log(error.message)
        });

        addDoc(statsRef, {
            "player": playerTwo,
            "score": scoreTwo
        }).then(response => {
            console.log(response)
            setIdTwo(response.id)
            setScoreTwo(scoreTwo)

            localStorage.setItem("idTwo", idTwo)
            localStorage.setItem("scoreTwo", scoreTwo )

        }).catch(error => {
            console.log(error.message)
        });

        if (errors.length > 0) {
            setErrors(errors);
            isError = true;
        }
        if (!isError) {

            localStorage.setItem("playerOne", playerOne)
            localStorage.setItem("playerTwo", playerTwo)
            history.push('/game');
            window.location.reload()
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((error) => (
                <p className="error" key={error}>Error: {error}</p>
            ))}

            <label className="login-form">First Player</label>
            <br/>
            <input
                type="text"
                value={playerOne}
                onChange={(event) => setPlayerOne(event.target.value)}
                placeholder="Player ❌"
                className="input-form-x"
                maxLength={10}
            />
            <br/>
            <br/>

            <label className="login-form">Second Player</label>
            <br/>
            <input type="text"
                   value={playerTwo}
                   onChange={(event) => setPlayerTwo(event.target.value)}
                   placeholder="Player 🔵"
                   className="input-form-o"
                   maxLength={10}
            />
            <label className="login-form">Type size of board</label>
            <input type="text"
                   value={size}
                   onChange={(event) => setSize(event.target.value)}
                   placeholder="Size"
                   className="input-form-o"
            />
            <br/>
            <br/>
            <input type="button" type="submit" value="Submit" className="button-form"/>
            <br/>
            <br/>
            <input type="button" onClick={resetData} value="Reset" className="button-form"/>
        </form>
    );
};

export default Forms;