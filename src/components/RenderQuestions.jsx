import React, { Component } from 'react';
import '../App.css';

export default class RenderQuestions extends Component {
  constructor() {
    super();

    this.getQuestions = this.getQuestions.bind(this);

    this.state = {
      questions: [],
      index: 0,
      renderQ: true,
      show: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((resp) => resp.json())
      .then((r) => this.setState({ questions: r, renderQ: false }));
  }

  showAnswers() {
    this.setState({ show: true });
  }

  render() {
    const { questions, index, renderQ, show } = this.state;
    if (renderQ) {
      return (
        <p>Loading</p>
      );
    }
    return (
      <div>
        <p data-testid="question-category">{ questions.results[index].category }</p>
        <p data-testid="question-text">{ questions.results[index].question }</p>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ () => this.showAnswers() }
          className={ (show) ? 'green-border' : null }
        >
          { questions.results[index].correct_answer }
        </button>
        {/* transformar incorrect answers em um map para
        ficar dinamico em caso de true or false */}
        {questions.results[index].incorrect_answers
          .map((elem, i) => (
            <button
              onClick={ () => this.showAnswers() }
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

// // category: "General Knowledge"
// correct_answer: "Saffron"
// difficulty: "medium"
// incorrect_answers: (3) ['Cinnamon', 'Cardamom', 'Vanilla']
// question: "What is the world&#039;s most expensive spice by weight?"
// type: "multiple"
