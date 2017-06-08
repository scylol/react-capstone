import {FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS,
        FETCH_QUESTIONS_ERROR, SELECT_ANSWER, SUBMIT_QUIZ, SET_USER_DATA} from '../actions/action';
import {_} from 'underscore';

const initialState = {
  questions: [],
  userToken: null,
  scoreTotals: {},
  loading: false,
  error: null,
  scoreTracker: [],
  scoreKeys: [],
  checkAnswerArray: [],
  score: 0,
  submittedQuiz: false,
  showScore: false
};

export default function reducer(state=initialState, action) {
  state = Object.assign({}, state);
  if(action.type === FETCH_QUESTIONS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if(action.type === FETCH_QUESTIONS_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_QUESTIONS_SUCCESS){
// make array of arrays of the incorrect answers
    const incorrectAnswers = _.pluck(action.questions, 'incorrect_answers');
// make an array of the correct answers    
    const answerArray = _.pluck(action.questions, 'correct_answer');
//make a choices array by combinining the 2 arrays above, and shuffling them
     incorrectAnswers.forEach((val,ind)=>{
       let answers = _.shuffle([...val, answerArray[ind]]);
      action.questions[ind].choices = answers;
    });
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false,
      error: null,
      scoreKeys: answerArray,
      checkAnswerArray: [],
      submittedQuiz: false,
      score: 0,
      showScore: false
    });
  }
  else if(action.type === SELECT_ANSWER){
//create a copy of scoreTracker    
    let scoreCopy = state.scoreTracker.slice(0);
     scoreCopy[action.index] = action.value;
      state = Object.assign({}, state, {
      scoreTracker: scoreCopy
    });
  }
  else if(action.type === SUBMIT_QUIZ){
// if answered corrected, add 1, else add a 0    
    state.checkAnswerArray = state.scoreTracker.map((value, index) => {
      if(value === state.scoreKeys[index]) {
        return 1;
      }
      else {
        return 0;
      }
    });
   
//Sums the checkAnswer Array.
    state.score = state.checkAnswerArray.reduce(function(acc, val) {
      return acc + val;
    }, 0);
// set category equal to the current category of the quiz
    const category = state.questions[0].category;
// spread through state.scoreTotals
    state.scoreTotals = {...state.scoreTotals};
//If it doesn't have the property of Category, add it.
    if(!state.scoreTotals.hasOwnProperty(state.questions[0].category)) {
      state.scoreTotals[category] = [0,0];
    }
//Add the score to the numerator, add 10 to denominator
    state.scoreTotals[category][0] += state.score;
    state.scoreTotals[category][1] += 10;
    state.submittedQuiz = true;
    state.showScore = true;

  }
  else if(action.type === SET_USER_DATA) {
//sets the State based on the User's Cookie.
    state = Object.assign({}, state, {
      userToken: action.value.id,
      scoreTotals: action.value.scores
    });
  }
  

  return state;
}
