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
//Turns the selected answer to greeen, as well as dispatches the selectAnswer action which will put the selected answer into array according to its index.
  handleAnswer(event) {
    const values = event.target.id.split(',')
    const index = values[0];
    const value = event.target.value;

    this.props.dispatch(selectAnswer(index, value));

    $(event.target).siblings('button').removeClass('green');
    $(event.target).siblings('button').removeClass('pure-button-active');
    $(event.target).addClass('green');
    $(event.target).addClass('pure-button-active');
  }
//dispatches the submit Quiz action which compares the user's answers to the correct answers, then pushes them to the database.
  handleSubmit(event){
    this.props.dispatch(submitQuiz());
    $('.score-container').show();
    $('.submit-button').hide();
};

render() {
    let questions = this.props.questions.map((question, index) => {
//parse out the annoying strings from the API
      let parsedQuestion = question.question;
      parsedQuestion = parsedQuestion.replace(/(&quot\;)/g,"\"")
      parsedQuestion = parsedQuestion.replace(/(&rdquo\;)/g,"\"")
      parsedQuestion = parsedQuestion.replace(/(&#039;)/g,"\'")
      parsedQuestion = parsedQuestion.replace(/(&ldquo;)/g,"\"")
      parsedQuestion = parsedQuestion.replace(/(&amp;)/g,"\&")
      parsedQuestion = parsedQuestion.replace(/(&shy;)/g,"\-")
      parsedQuestion = parsedQuestion.replace(/(Pok&eacute;)/g,"\Poke")
// sets the background color to green or red depending on correct or incorrect.
      let color = "";
      if(this.props.checkAnswerArray.length > 0) {
        if(this.props.checkAnswerArray[index] === 1) {
          color = 'light-green';
        }
        else {
          color = 'light-red';
        }
      }
      const choices = this.props.questions[index].choices.map((choice, index2) => {
//parse out the annoying strings from the API        
        let parsedChoice = choice;
        parsedChoice = parsedChoice.replace(/(&quot\;)/g,"\"")
        parsedChoice =parsedChoice.replace(/(&rdquo\;)/g,"\"")
        parsedChoice = parsedChoice.replace(/(&#039;)/g,"\'")
        parsedChoice = parsedChoice.replace(/(&ldquo;)/g,"\"")
        parsedChoice = parsedChoice.replace(/(&amp;)/g,"\&")
        parsedChoice = parsedChoice.replace(/(&shy;)/g,"\-")
        parsedChoice = parsedChoice.replace(/(Pok&eacute;)/g,"\Poke")
        console.log(parsedChoice);
        
// sets the background color to green or red depending on correct or incorrect.
        let buttonColor = "";
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
            className={`choice-button pure-button ${buttonColor}`}
            onClick={this.handleAnswer}
            value={choice}
            key={index2}
            id={[index,index2]}
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
    let button = "";
    if(questions.length > 0){
      button = <button className='submit-button pure-button' onClick={this.handleSubmit}>Submit</button>;
    }
    if(!questions.length > 0){
      questions = <h2>Please pick a quiz!</h2>
    }
    return (
      <div>

        <ul id="questionList">
          {questions}
          <li>
            <div className='score-container'><h2>Your Score:{this.props.score}0%</h2></div>
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
  checkAnswerArray: state.checkAnswerArray
});

export default connect(mapStateToProps)(Quiz);
