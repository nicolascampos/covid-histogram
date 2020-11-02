import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_FAIL,
  SET_DAYS_RANGE,
  SET_STATE,
} from '../constants/actions';

const initialState = {
  data: [],
  daysRange: 7,
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
    case SET_DAYS_RANGE:
      return {
        ...state,
        daysRange: action.payload.daysRange,
      };
    case SET_STATE:
      return {
        ...state,
        stateCode: action.payload.stateCode,
      };
    default:
      break;
  }
  return state;
};
