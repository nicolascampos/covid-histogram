export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCES_FAIL = 'FETCH_RESOURCES_FAIL';

export const fetchResources = () => {
    return (dispatch) => {
        fetch('https://api.covidtracking.com/v1/states/current.json')
        .then((response) => response.json())
        .then((data) => {
            dispatch({
                type: FETCH_RESOURCES,
                payload: { data },
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_RESOURCES_FAIL,
                payload: { error }
            });
        });
    };
}