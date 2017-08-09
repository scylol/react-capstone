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

export const SELECT_ANSWER = 'SELECT_ANSWER';
export const selectAnswer = (index, value) => ({
  type: SELECT_ANSWER,
  index,
  value
});

export const SUBMIT_QUIZ = 'SUBMIT_QUIZ';
export const submitQuiz = () => ({
  type: SUBMIT_QUIZ
});

export const SET_USER_DATA = 'SET_USER_DATA';
export const setUserData = (value) => ({
  type: SET_USER_DATA,
  value
});

export const fetchQuestions = (category) => (dispatch) => {
  dispatch(fetchQuestionsRequest());
  fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(data => {
    dispatch(fetchQuestionsSuccess(data.results));
  }).catch(error => {
    dispatch(fetchQuestionsError(error));
  });
};

export const updateUserScore = () => (dispatch, getState) => {
  //Updates the Users score inside the database
  const state = getState();
  fetch(`/api/users/${state.userToken.toString()}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({'scores': state.scoreTotals})
  }).then(res=> {
    console.log('res', res);
    return res.json();
  }).catch(err => {
    console.log(err);
  });
};



