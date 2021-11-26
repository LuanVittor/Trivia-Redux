/* eslint-disable space-before-blocks */
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  constructor() {
    super();
    this.pushRanking = this.pushRanking.bind(this);
    this.pushPlayAgain = this.pushPlayAgain.bind(this);
  }

  getInformation(){
    const data = JSON.parse(localStorage.getItem('state'));
    return (
      <span>
        <p
          data-testid="feedback-total-score"
        >
          {data.player.score}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          {data.player.assertions}
        </p>
      </span>
    );
  }

  showMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const rightAnwsers = state.player.assertions;
    const tres = 3;
    if (rightAnwsers < tres) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  pushRanking() {
    const { history } = this.props;
    return history.push('/ranking');
  }

  pushPlayAgain() {
    const { history } = this.props;
    return history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Tela de feedback</h1>
        { this.showMessage() }
        { this.getInformation() }
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.pushRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.pushPlayAgain }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}
