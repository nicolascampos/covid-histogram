import React from 'react';
import PropTypes from 'prop-types';

import './DaysRangeSelector.scss';

const DaysRangeSelector = ({ handleChange }) => (
  <div className="daysRangeSelector">
    <label htmlFor="rangeSelector">
      Show data from:
      <select
        className="daysRangeSelector_dropdown"
        name="daysRange"
        id="rangeSelector"
        onChange={handleChange}
      >
        <option value="7">Last 7 days</option>
        <option value="21">Last 21 days</option>
        <option value="0">All time</option>
      </select>
    </label>
  </div>
);

DaysRangeSelector.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default DaysRangeSelector;
