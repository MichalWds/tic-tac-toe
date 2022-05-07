import React from 'react';
import Player from "./Player";

function validate(nameOne, nameTwo) {
    const errors = [];

    if (nameOne.length < 5) {
        errors.push('Name of first player should be at least 5 characters long');
    }

    if (nameTwo.length < 5) {
        errors.push('Name of second player should be at least 5 characters long');
    }

    if (errors.length == 0) {
        errors.push('None');
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

        const errors = validate(nameOne, nameTwo);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
    };

    refreshPage = ()=> {
        window.location.reload();
    };
    onClickFunctions = () => {

        this.props.history.push('/game');
    //   this.refreshPage();

        this.handleSubmit();
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
                    placeholder="playerOne"
                />
                <input
                    value={this.state.nameTwo}
                    onChange={(evt) => this.setState({ nameTwo: evt.target.value })}
                    type="text"
                    placeholder="playerTwo"
                />
                <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-dark"
                        onClick={this.onClickFunctions}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    };
}