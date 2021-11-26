import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  constructor() {
    super();
    this.pushRanking = this.pushRanking.bind(this);
  }

  pushRanking() {
    const { history } = this.props;
    return history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.pushRanking }
        >
          inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
