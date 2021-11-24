import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApi } from '../redux/actions';

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

  redirect() {
    const { history } = this.props;
    history.push('/game');
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((resp) => localStorage.setItem('token', resp.token));
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
          onClick={ () => { this.redirect(); } }
          disabled={ this.enableButton() }
        >
          Jogar
        </button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   api: (jsonObj) => dispatch(getApi(jsonObj)),
// });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, null)(Login);
