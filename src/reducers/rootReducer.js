import { TEST_ACTION } from '../constants/actions';

const initialState = {
    text: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TEST_ACTION:
            state = {
                ...state,
                text: action.payload.text
            }
            console.log(state);
            break;
        default:
            break;
    }
    return state;
};