import React from "react";
import { connect } from "react-redux";
import { selectAnswer } from "../actions/action";

import { _ } from "underscore";

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer(event) {
    const index = event.target.key;
    const value = event.target.questionId;
    this.props.dispatch(selectAnswer(index, value));
  }

  render() {
    const questions = this.props.questions.map((question, index) => {
      let choicesArray = [
        ...question.incorrect_answers,
        question.correct_answer
      ];
      choicesArray = _.shuffle(choicesArray);
      const choices = choicesArray.map((choice, index2) => {
        return (
          <button
            className="choice-button"
            onClick={this.handleAnswer}
            questionId={index}
            value={choice}
            key={index2}
          >
            {choice}
          </button>
        );
      });
      return (
        <li key={index}>
          {question.question}<br />
          {choices}
        </li>
      );
    });

    return (
      <ul id="questionList">
        {questions}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  scoreKeys: state.scoreKeys,
  questions: state.questions
});

export default connect(mapStateToProps)(Quiz);
