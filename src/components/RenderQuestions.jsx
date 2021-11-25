import React, { Component } from 'react';

export default class RenderQuestions extends Component {
  constructor() {
    super();

    this.getQuestions = this.getQuestions.bind(this);

    this.state = {
      questions: [],
      index: 0,
      renderQ: true,
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

  render() {
    const { questions, index, renderQ } = this.state;
    console.log(questions);
    if (renderQ) {
      return (
        <p>Loading</p>
      );
    }
    return (
      <div>
        <p data-testid="question-category">{ questions.results[index].category }</p>
        <p data-testid="question-text">{ questions.results[index].question }</p>
        <p data-testid="correct-answer">{ questions.results[index].correct_answer }</p>
        <p data-testid="wrong-answer-0">{ }</p>
        <p data-testid="wrong-answer-1">{ }</p>
        <p data-testid="wrong-answer-3">{ }</p>

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
