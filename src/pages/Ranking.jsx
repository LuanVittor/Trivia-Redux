import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

export default class Ranking extends Component {
  constructor() {
    super();
    this.pushRanking = this.pushRanking.bind(this);
  }

  pushRanking() {
    const { history } = this.props;
    return history.push('/');
  }

  renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Pontuacao</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((elem, index) => (
            <tr key={ elem.name }>
              <td>
                <img
                  src={ `https://www.gravatar.com/avatar/${md5(elem.email).toString()}` }
                  alt="User"
                />
              </td>
              <td data-testid={ `player-name-${index}` }>{elem.name}</td>
              <td>{elem.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.renderRanking()}
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
