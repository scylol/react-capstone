import {FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_ERROR} from '../actions/action';

const initialState = {
    questions: [],
	userToken: null,
	score: {},
    loading: false,
    error: null

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
        return Object.assign({}, state, {
            questions: action.questions,
            activeCategory: action.questions[0].category,
            loading: false,
            error: null
        });
    }

    return state;
}
