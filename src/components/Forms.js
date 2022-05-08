import React, {useState} from 'react';

function validate(nameOne, nameTwo) {
    const errors = [];


    if (nameOne.length < 5) {
        errors.push('Name of first player should be at least 5 characters long');
    }

    if (nameTwo.length < 5) {
        errors.push('Name of second player should be at least 5 characters long');
    }

    if (errors.length == 0) {
        alert('POPRAWNE DANE');
        return errors;
    }
    return errors;
}

export default class Forms extends React.Component {

    constructor() {
        super();
        this.state = {
            nameOne: '',
            nameTwo: '',
            errors: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e?.preventDefault();
        const { nameOne, nameTwo } = this.state;

        let isError = false;

        const errors = validate(nameOne, nameTwo);
        if (errors.length > 0) {
            this.setState({ errors: errors });
            isError = true;
        }
        if (!isError) {

            localStorage.setItem("playerOne", nameOne)
            localStorage.setItem("playerTwo", nameTwo)

            this.props.history.push('/game');
            window. location. reload()  //remove in future
        }
    };

    render = () => {
        const { errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                {errors.map((error) => (
                    <p key={error}>Error: {error}</p>
                ))}

                <input
                    value={this.state.nameOne}
                    onChange={(evt) => this.setState({ nameOne: evt.target.value })}
                    type="text"
                    placeholder="player X"
                />
                <input
                    value={this.state.nameTwo}
                    onChange={(evt) => this.setState({ nameTwo: evt.target.value })}
                    type="text"
                    placeholder="player O"
                />
                <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-dark"
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    };
}