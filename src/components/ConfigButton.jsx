import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class ConfigButton extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);

    this.state = {
      redirect: false,
    };
  }

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/settings" />;
    }
    return (
      <div>
        <button
          type="submit"
          data-testid="btn-settings"
          onClick={ () => this.redirect() }
        >
          Configurações
        </button>
      </div>
    );
  }
}

ConfigButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(ConfigButton);
