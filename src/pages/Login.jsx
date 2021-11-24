import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);

    this.state = {
      userName: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableButton();
  }

  enableButton() {
    const { userName, email } = this.state;
    if (userName !== '' && email !== '') {
      return false;
    } return true;
  }

  render() {
    const { userName, email } = this.state;
    return (
      <div>
        <input
          name="userName"
          value={ userName }
          onChange={ this.handleChange }
          type="text"
          data-testid="input-player-name"
        />
        <input
          name="email"
          value={ email }
          onChange={ this.handleChange }
          type="email"
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => <Redirect to="/game" /> }
          disabled={ this.enableButton() }
        >
          Jogar
        </button>
      </div>
    );
  }
}
