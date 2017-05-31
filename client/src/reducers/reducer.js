import {FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, 
        FETCH_QUESTIONS_ERROR, SELECT_ANSWER} from '../actions/action';
import {_} from 'underscore';

const initialState = {
  questions: [],
  userToken: null,
  scoreTotals: {},
  loading: false,
  error: null,
  scoreTracker: [],
  scoreKeys: []
  

};

export default function reducer(state=initialState, action) {
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
    console.log(action.value);
    let scoreCopy = state.scoreTracker.slice(0);
    console.log(scoreCopy);

    scoreCopy[action.index] = action.value;
    // console.log(scoreCopy);
    return Object.assign({}, state, {
      scoreTracker: scoreCopy
    }); 
  }

  return state;
}
