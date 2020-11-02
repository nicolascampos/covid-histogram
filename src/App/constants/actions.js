export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCES_FAIL = 'FETCH_RESOURCES_FAIL';
export const SET_DAYS_RANGE = 'SET_DAYS_RANGE';
export const SET_STATE = 'SET_STATE';

export const fetchResources = (daysRange, stateCode = '') => (dispatch) => {
  const apiUrl = stateCode 
    ? `https://api.covidtracking.com/v1/states/${stateCode}/daily.json`
    :'https://api.covidtracking.com/v1/us/daily.json';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const filteredData = daysRange
        ? data.slice(0, daysRange).reverse()
        : data.reverse();

      dispatch({
        type: FETCH_RESOURCES,
        payload: { data: filteredData },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_RESOURCES_FAIL,
        payload: { error },
      });
    });
};

export const setDaysRange = (days, stateCode = '') => (dispatch) => {
  const daysRange = Number(days);

  dispatch({
    type: SET_DAYS_RANGE,
    payload: { daysRange },
  });
  dispatch(fetchResources(daysRange, stateCode));
};

export const setState = (stateCode) => (dispatch) => {
  dispatch({
    type: SET_STATE,
    payload: { stateCode },
  });
  dispatch(fetchResources(7, stateCode));
};

export const setUserInput = (userInput, inputSuggestions) => (dispatch) => {
  dispatch({
    type: SET_USER_INPUT,
    payload: {
      userInput,
      inputSuggestions,
    },
  });
};

