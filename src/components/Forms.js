import React from 'react';

function validate(name) {
    const errors = [];

    if (name.length < 5) {
        errors.push('Name should be at least 5 characters long');
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
            name: '',
            errors: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { name } = this.state;

        const errors = validate(name);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
    };

    onClickFunctions = () => {

        this.props.history.push('/game');
        this.handleSubmit();

    }

    render = () => {
        const { errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                {errors.map((error) => (
                    <p key={error}>Error: {error}</p>
                ))}

                <input
                    value={this.state.name}
                    onChange={(evt) => this.setState({ name: evt.target.value })}
                    type="text"
                    placeholder="name"
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