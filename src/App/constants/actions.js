export const FETCH_DRILLDOWN_DATA = 'FETCH_DRILLDOWN_DATA';
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCES_FAIL = 'FETCH_RESOURCES_FAIL';
export const SET_DAYS_RANGE = 'SET_DAYS_RANGE';

export const fetchResources = (daysRange) => (dispatch) => {
  fetch('https://api.covidtracking.com/v1/us/daily.json')
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

export const setDaysRange = (days) => (dispatch) => {
  const daysRange = Number(days);

  dispatch({
    type: SET_DAYS_RANGE,
    payload: { daysRange },
  });
  dispatch(fetchResources(daysRange));
};

export const fetchDrilldownData = (date) => (dispatch) => {
  fetch(`https://covid-api.com/api/reports?region_name=US&date=${date}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_DRILLDOWN_DATA,
        payload: { drilldownData: data },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_RESOURCES_FAIL,
        payload: { error },
      });
    });
};
