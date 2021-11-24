import React, { Component } from 'react';
import Header from '../components/Header';
import RenderQuestions from '../components/RenderQuestions';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <RenderQuestions />
      </div>
    );
  }
}
