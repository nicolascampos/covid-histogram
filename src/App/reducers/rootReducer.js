import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_FAIL,
} from '../constants/actions';

const initialState = {
  data: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES:
      state = {
        ...state,
        data: action.payload.data
      }
      break;
    case FETCH_RESOURCES_FAIL:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
    default:
      break;
  }
  return state;
};