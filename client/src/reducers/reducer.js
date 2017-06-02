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
  score: 0
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
    const incorrectAnswers = _.pluck(action.questions, 'incorrect_answers');
    const answerArray = _.pluck(action.questions, 'correct_answer');

    let choice = incorrectAnswers.forEach((val,ind)=>{

      let answers = _.shuffle([...val, answerArray[ind]]);
      action.questions[ind].choices = answers;
    });

    console.log(choice);
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false,
      error: null,
      scoreKeys: answerArray,
      checkAnswerArray: []
    });
  }
  else if(action.type === SELECT_ANSWER){
    //console.log(action.value);
    let scoreCopy = state.scoreTracker.slice(0);
    //console.log(scoreCopy);

    scoreCopy[action.index] = action.value;
    // console.log(scoreCopy);
    state = Object.assign({}, state, {
      scoreTracker: scoreCopy
    });
  }
  else if(action.type === SUBMIT_QUIZ){
    state.checkAnswerArray = state.scoreTracker.map((value, index) => {
      if(value === state.scoreKeys[index]) {
        return 1;
      }
      else {
        return 0;
      }
    });
    console.log(state.checkAnswerArray);

    state.score = state.checkAnswerArray.reduce(function(acc, val) {
      return acc + val;
    }, 0);

    console.log(state.score);
    const category = state.questions[0].category;
    state.scoreTotals = {...state.scoreTotals};
    if(!state.scoreTotals.hasOwnProperty(state.questions[0].category)) {

      state.scoreTotals[category] = [0,0];
      console.log('hello world');

    }
    state.scoreTotals[category][0] += state.score;
    state.scoreTotals[category][1] += 10;
    console.log(state.questions[0].category);
    fetch(`/api/users/${state.userToken.toString()}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'scores': state.scoreTotals})
    }).then(res=>res.json())
    .catch(err => {
      console.log(err);
    });
  }
  else if(action.type === SET_USER_DATA) {
    console.log(action.value);
    console.log(action.value.scores);
    state = Object.assign({}, state, {
      userToken: action.value.id,
      scoreTotals: action.value.scores
    });
  }

  return state;
}
