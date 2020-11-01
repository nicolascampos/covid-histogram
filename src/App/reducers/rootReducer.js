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
      return {
        ...state,
        data: action.payload.data,
      };
    case FETCH_RESOURCES_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      break;
  }
  return state;
};
