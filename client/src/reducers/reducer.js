import {FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS,
        FETCH_QUESTIONS_ERROR, SELECT_ANSWER, SUBMIT_QUIZ} from '../actions/action';
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
    
    const answerArray = _.pluck(action.questions, 'correct_answer');
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false,
      error: null,
      scoreKeys: answerArray
    });
  }
  else if(action.type === SELECT_ANSWER){
    //console.log(action.value);
    let scoreCopy = state.scoreTracker.slice(0);
    //console.log(scoreCopy);

    scoreCopy[action.index] = action.value;
    // console.log(scoreCopy);
    return Object.assign({}, state, {
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
    if(!state.scoreTotals.hasOwnProperty(state.questions[0].category)) {
      
      state.scoreTotals[category] = [0,0];
      console.log('hello world');
      
    }
    state.scoreTotals[category][0] += state.score;
    state.scoreTotals[category][1] += 10;
    console.log(state.questions[0].category);
  }

  return state;
}
