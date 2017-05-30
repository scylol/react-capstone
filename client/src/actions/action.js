import {Categories} from '../config.js'

export const fetchQuestions = (category,difficulty) => dispatch => {
  console.log('called fetch questions');
  dispatch(fetchQuestionsRequest());
  console.log(category)
  fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}&difficulty=${difficulty}`).then(res => {
    if(!res.ok) {
        return Promise.reject(res.statusText);
      }
    return res.json();
    }).then(question => {
      console.log(question)
      dispatch(fetchQuestionsSuccess(question));
    }).catch(error => {
      dispatch(fetchQuestionsError(error));
    });
};

//sync action to confirm the receipt of the API request
export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const fetchQuestionsRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST
});

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  questions

});

export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionsError = error => ({
  type: FETCH_QUESTIONS_ERROR,
  error
});
