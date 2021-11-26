import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import RenderQuestions from '../components/RenderQuestions';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <RenderQuestions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
