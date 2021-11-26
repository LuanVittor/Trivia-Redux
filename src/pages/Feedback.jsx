import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     rightAnwsers: 0
  //   };
  // }

  showMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const rightAnwsers = state.player.assertions;
    console.log(rightAnwsers);
    const tres = 3;
    if (rightAnwsers < tres) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Tela de feedback</h1>
        { this.showMessage() }
      </div>
    );
  }
}
