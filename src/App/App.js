import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import states from './constants/statesCodes';
import {
  fetchResources,
  setDaysRange,
  setState,
} from './constants/actions';

import DaysRangeSelector from './components/DaysRangeSelector/DaysRangeSelector';
import Histogram from './components/Histogram/Histogram';
import InputWithSuggestions from './components/InputWithSuggestions/InputWithSuggestions';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const { fetchResources, daysRange } = this.props;

    fetchResources(daysRange);
  }

  handleDaysRangeChange(e) {
    const { stateCode, setDaysRange } = this.props;

    setDaysRange(e.target.value, stateCode);
  }

  handleStateChange(e) {
    const { setState } = this.props;
    const stateCode = e.target.getAttribute('statecode')
      ? e.target.getAttribute('statecode')
      : '';

    setState(stateCode);
  }

  render() {
    const { data, stateCode, setState } = this.props;
    const nationwideStatsSpan = () => (stateCode
      ? (
        <span
          role="button"
          className="appContainer_filtersBar_span"
          onClick={() => setState('')}
        >
          Show nationwide statistics
        </span>
      )
      : null);

    return (
      <div className="appContainer">
        <h1>Covid Histogram</h1>
        <div className="appContainer_filtersBar">
          <InputWithSuggestions
            options={states}
            maxSuggestions="5"
            handleStateChange={this.handleStateChange.bind(this)}
          />
          {nationwideStatsSpan()}
          <DaysRangeSelector handleChange={this.handleDaysRangeChange.bind(this)} />
        </div>
        <Histogram data={data} stateCode={stateCode} />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    positiveIncrease: PropTypes.number,
    deathIncrease: PropTypes.number,
  })).isRequired,
  daysRange: PropTypes.number.isRequired,
  stateCode: PropTypes.string,
  fetchResources: PropTypes.func.isRequired,
  setDaysRange: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchResources,
  setDaysRange,
  setState,
};
const mapStateToProps = (state) => ({
  data: state.data,
  daysRange: state.daysRange,
  error: state.error,
  stateCode: state.stateCode,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
