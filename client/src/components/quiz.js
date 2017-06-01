import React from "react";
import { connect } from "react-redux";
import { selectAnswer, submitQuiz } from "../actions/action";
import $ from 'jquery';
import './quiz.css';
import { _ } from "underscore";

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAnswer(event) {
    const values = event.target.id.split(',')
    const index = values[0];
    const value = event.target.value;

    this.props.dispatch(selectAnswer(index, value));

    $(event.target).siblings('button').removeClass('green');
    $(event.target).addClass('green');
  }

  handleSubmit(event){
    this.props.dispatch(submitQuiz());
    $('.score-container').removeAttr('hidden');
    
  };


  render() {
    // $(`#b${ind}`).addClass('red')
    console.log('RENDERING QUIZ')
    const questions = this.props.questions.map((question, index) => {
      let color;
      if(this.props.checkAnswerArray.length > 0) {
        if(this.props.checkAnswerArray[index] === 1) {
          color = 'light-green';
        }
        else {
          color = 'light-red';
        }
      }
      const choices = this.props.questions[index].choices.map((choice, index2) => {
        let buttonColor;
          if(this.props.checkAnswerArray.length > 0) {
            if(choice === this.props.scoreTracker[index]) {
              buttonColor = 'red';
            }
            if (choice === this.props.scoreKeys[index]) {
              buttonColor = 'green';
            }
          }

        return (
          <button
            className={`choice-button ${buttonColor}`}
            onClick={this.handleAnswer}
            value={choice}
            key={index2}
            id={[index,index2]}
          >
            {choice}
          </button>
        );
      });
      return (
        <li id={`b${index}`} className={`question-box ${color}`} key={index}>
        {question.question}<br />
          {choices}
        </li>
      );
    });

    return (
      <div>
        <ul id="questionList">
          {questions}
          <li>
            <button className='submit-button' onClick={this.handleSubmit}>Submit</button>
            <div hidden className='score-container'>Your Score:{this.props.score}0%</div>
          </li>
        </ul>


      </div>

    );
  }
}

const mapStateToProps = state => ({
  scoreKeys: state.scoreKeys,
  scoreTracker: state.scoreTracker,
  questions: state.questions,
  score: state.score,
  checkAnswerArray: state.checkAnswerArray
});

export default connect(mapStateToProps)(Quiz);
