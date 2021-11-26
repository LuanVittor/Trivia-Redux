import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Tela de feedback</h1>
      </div>
    );
  }
}
