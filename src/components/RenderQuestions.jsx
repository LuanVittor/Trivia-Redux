import React, { Component } from 'react';
import '../App.css';

export default class RenderQuestions extends Component {
  constructor() {
    super();

    this.getQuestions = this.getQuestions.bind(this);
    this.timeout = this.timeout.bind(this);

    this.state = {
      questions: [],
      index: 0,
      renderQ: true,
      show: false,
      timer: 30,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.timeout();
  }

  getQuestions() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((resp) => resp.json())
      .then((r) => this.setState({ questions: r, renderQ: false }));
  }

  stopInverval(param) {
    clearInterval(param);
  }

  timeout() {
    const MIL = 1000;
    const timer2 = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer === 1) {
        this.stopInverval(timer2);
        this.showAnswers();
        return this.setState({ timer: 0 });
      }
    }, MIL);
  }

  showAnswers() {
    this.setState({ show: true });
    this.disableButton();
  }

  disableButton() {
    const { show } = this.state;
    if (show) {
      return true;
    }
    return false;
  }

  render() {
    const { questions, index, renderQ, show, timer } = this.state;
    if (renderQ) {
      return (
        <p>Loading...</p>
      );
    }
    return (
      <div>
        {timer}
        <p data-testid="question-category">{ questions.results[index].category }</p>
        <p data-testid="question-text">{ questions.results[index].question }</p>
        <button
          type="button"
          disabled={ this.disableButton() }
          data-testid="correct-answer"
          onClick={ () => this.showAnswers() }
          className={ (show) ? 'green-border' : null }
        >
          { questions.results[index].correct_answer }
        </button>
        {questions.results[index].incorrect_answers
          .map((elem, i) => (
            <button
              onClick={ () => this.showAnswers() }
              disabled={ this.disableButton() }
              className={ (show) ? 'red-border' : null }
              key={ i }
              type="button"
              data-testid={ `wrong-answer-${i}` }
            >
              { elem }
            </button>
          ))}
      </div>
    );
  }
}
