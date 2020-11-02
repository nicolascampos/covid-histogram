import {
  FETCH_DRILLDOWN_DATA,
  FETCH_RESOURCES,
  FETCH_RESOURCES_FAIL,
  SET_DAYS_RANGE,
} from '../constants/actions';

const initialState = {
  data: [],
  drilldownData: [],
  daysRange: 7,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRILLDOWN_DATA:
      return {
        ...state,
        drilldownData: action.payload.drilldownData,
      };
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
    default:
      break;
  }
  return state;
};
