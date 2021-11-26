/* eslint-disable indent */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { scores } from '../redux/actions';

class RenderQuestions extends Component {
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

  makesum() {
    const { timer, index, questions } = this.state;
    let { score } = this.props;
    const { dispatchScore } = this.props;
    const tres = 3;
    if (questions.results[index].difficulty === 'easy') {
      dispatchScore(score += timer * 1);
      return score;
    } if (questions.results[index].difficulty === 'medium') {
      dispatchScore(score += timer * 2);
      return score;
    } if (questions.results[index].difficulty === 'hard') {
      dispatchScore(score += timer * tres);
      return score;
    }
  }

  timeout() {
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer === 1) {
        this.stopInverval(this.interval);
        this.showAnswers();
        return this.setState({ timer: 0 });
      }
    }, oneSecond);
  }

  showAnswers(className) {
    this.stopInverval(this.interval);
    const local = {
      player: {
        // name,
        // assertions: ,
        score: this.makesum(),
        // gravatarEmail
      },
    };
    if (className === 'correct-answer') {
      localStorage.setItem('state', JSON.stringify(local));
    }
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

  nextQuestion() {
    const { history } = this.props;
    const { index } = this.state;
    this.setState({ show: false });
    const four = 4;
    if (index < four) {
      this.setState({ index: index + 1 });
      this.setState({ timer: 30 });
      this.timeout();
    } else {
      history.push('/feedback');
    }
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
          onClick={ () => this.showAnswers('correct-answer') }
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
        {(show)
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.nextQuestion() }
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

RenderQuestions.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(scores(score)),
});

const mapStateToProps = (state) => ({
  score: state.getScore.score,
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderQuestions);
