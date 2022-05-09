import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

function validate(nameOne, nameTwo) {
    const errors = [];


    if (nameOne.length < 5) {
        errors.push('Name of first player should be at least 5 characters long');
    }

    if (nameTwo.length < 5) {
        errors.push('Name of second player should be at least 5 characters long');
    }

    if (nameTwo == nameOne) {
        errors.push('Names are the same. Change one to continue');
    }

    if (errors.length == 0) {
        alert('POPRAWNE DANE');
        return errors;
    }
    return errors;
}

export const Forms2 = () => {
    const [nameOne, setNameOne] = useState('');
    const [nameTwo, setNameTwo] = useState('');
    const [errors, setErrors] = useState([]);

    let history = useHistory();

    const resetData = (e) => {
        e.preventDefault();
        setNameOne('');
        setNameTwo('');
        setErrors([]);

    };

   const handleSubmit = (e) => {
        e?.preventDefault();

        let isError = false;

        const errors = validate(nameOne, nameTwo);

        if (errors.length > 0) {
            setErrors(errors);
            isError = true;
        }
        if (!isError) {

            localStorage.setItem("playerOne", nameOne)
            localStorage.setItem("playerTwo", nameTwo)

            history.push('/game');
            window. location. reload()
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((error) => (
                <p key={error}>Error: {error}</p>
            ))}

            <label>playerOne</label>
            <input
                type="text"
                value={nameOne}
                onChange={(event) => setNameOne(event.target.value)}
                placeholder="player ❌"
            />
            <br/>
            <label>playerTwo</label>
            <input
                type="text"
                value={nameTwo}
                onChange={(event) => setNameTwo(event.target.value)}
                placeholder="player 🔵"
            />
            <br/>
            <br/>

            <button
                type="submit"
                className="button-form"
            >
                Submit
            </button>

            <input type="button" onClick={resetData} value="Reset form" className="button-form"/>
        </form>
    );
};

export default Forms2;