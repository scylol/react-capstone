export const fetchQuestions = () => dispatch => {
  dispatch(fetchQuestionsRequest());
  fetch('/api/questions').then(res => {
      if(!res.ok) {
          return Promise.reject(res.statusText);
        }
      return res.json();
    }).then(question => {
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