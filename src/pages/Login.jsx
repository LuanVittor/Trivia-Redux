import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfigButton from '../components/ConfigButton';
import { player } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.redirect = this.redirect.bind(this);

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

  async redirect() {
    const { userName, email } = this.state;
    const { history, getEmail } = this.props;
    const local = {
      player: {
        // name,
        // assertions: ,
        score: 0,
        // gravatarEmail
      },
    };
    localStorage.setItem('state', JSON.stringify(local));
    getEmail(userName, email);
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((resp) => localStorage.setItem('token', resp.token));
    history.push('/game');
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
          placeholder="Seu nome aqui"
          name="userName"
          value={ userName }
          onChange={ this.handleChange }
          type="text"
          data-testid="input-player-name"
        />
        <input
          placeholder="Seu email aqui"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          type="email"
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => { this.redirect(); } }
          disabled={ this.enableButton() }
        >
          Jogar
        </button>
        <ConfigButton />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // api: (jsonObj) => dispatch(getApi(jsonObj)),
  getEmail: (name, email) => dispatch(player(name, email)),
});

Login.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  getEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
