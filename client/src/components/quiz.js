import React from "react";
import { connect } from "react-redux";
import { _ } from "underscore";
import { selectAnswer, submitQuiz, updateUserScore } from "../actions/action";
import "./quiz.css";

export class Quiz extends React.Component {
  
  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Turns the selected answer to greeen, as well as dispatches the selectAnswer action which will put the selected answer into array according to its index.
  handleAnswer(event) {
    const values = event.target.id.split(",");
    const index = values[0];
    const value = event.target.value;
    this.props.dispatch(selectAnswer(index, value));
  }

  //dispatches the submit Quiz action which compares the user's answers to the correct answers, then pushes them to the database.
  handleSubmit(event) {
    this.props.dispatch(submitQuiz());
    this.props.dispatch(updateUserScore());
  }

  //parse out the annoying strings from the API
  parseText(text) {
    return text
      .replace(/(&eacute;)/g, "e")
      .replace(/(&quot\;)/g, '"')
      .replace(/(&rdquo\;)/g, '"')
      .replace(/(&#039;)/g, "'")
      .replace(/(&ldquo;)/g, '"')
      .replace(/(&amp;)/g, "&")
      .replace(/(&shy;)/g, "-")
      .replace(/(&rsquo;)/g, "'")
      .replace(/(&ecirc;)/g, "e")
      .replace(/(&ocirc;)/g, "o")
      .replace(/(&ouml;)/g, "o")
      .replace(/(&Ouml;)/g, "O")
      .replace(/(&lt;)/g, "<")
      .replace(/(&oacute;)/g, "o")
      .replace(/(&auml;)/g, "a")
      .replace(/(&uuml;)/g, "U")
      .replace(/(&scaron;)/g, "s");
  }

  render() {
    let questions = this.props.questions.map((question, index) => {
      let parsedQuestion = question.question;
      parsedQuestion = this.parseText(parsedQuestion);
      // sets the background color to green or red depending on correct or incorrect.
      let color;
      if (this.props.checkAnswerArray.length > 0) {
        if (this.props.checkAnswerArray[index] === 1) {
          color = "light-green";
        } else {
          color = "light-red";
        }
      }

      let choices = this.props.questions[index].choices.map((choice, index2) => {
        let parsedChoice = choice;
        parsedChoice = this.parseText(parsedChoice);
        // sets the background color to green or red depending on correct or incorrect.
        let buttonColor;
        if (this.props.checkAnswerArray.length > 0) {
          if (choice === this.props.scoreTracker[index]) {
            buttonColor = "red";
          }
          if (choice === this.props.scoreKeys[index]) {
            buttonColor = "green";
          }
        } else if (choice === this.props.scoreTracker[index]) {
          buttonColor = "green";
        }
        return (
          <button
            className={`choice-button pure-button ${buttonColor}`}
            onClick={this.handleAnswer}
            value={choice}
            key={index2}
            id={[index, index2]}
          >
            {parsedChoice}
          </button>
        );
      });

      return (
        <li id={`b${index}`} className={`question-box ${color}`} key={index}>
          <h3>{parsedQuestion}</h3>
          {choices}
        </li>
      );
    });

    //hides submit button on submit
    let button;
    if (questions.length > 0 && this.props.submittedQuiz === false) {
      button = (
        <button
          className="submit-button pure-button"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    }

    // Sets Questions to this text before a topic is selected
    if (!questions.length > 0) {
      questions = <h2>Please pick a quiz!</h2>;
    }

    //Shows the score table after submit
    let scoreTable;
    if (this.props.showScore === true) {
      scoreTable = `Your Score:${this.props.score}0%`;
    } else {
      scoreTable = "";
    }
    return (
      <div>
        <ul id="questionList">
          {questions}
          <li>
            <div className="score-container"><h2>{scoreTable}</h2></div>
          </li>
        </ul>
        {button}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  scoreKeys: state.scoreKeys,
  scoreTracker: state.scoreTracker,
  questions: state.questions,
  score: state.score,
  checkAnswerArray: state.checkAnswerArray,
  submittedQuiz: state.submittedQuiz,
  showScore: state.showScore
});

export default connect(mapStateToProps)(Quiz);
