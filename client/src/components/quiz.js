import React from 'react';
import {connect} from 'react-redux';

import {_} from 'underscore';

export class Quiz extends React.Component {


    render() {
        const questions = this.props.questions.map((question, index) => {
            let choicesArray = [...question.incorrect_answers, question.correct_answer];
             choicesArray = _.shuffle(choicesArray);
             
             const choices = choicesArray.map((choice, index) => {
                 
                 return <button className='choice-button' value={choice} key={index}>{choice}</button>
             });
       return <li key={index}>
                {question.question}<br />
                {choices}
            </li>
        });

        return (
            <ul id="questionList">
                {questions}
            </ul>
        )
    }
}



const mapStateToProps = state => ({
    questions: state.questions
})

export default connect(mapStateToProps)(Quiz);