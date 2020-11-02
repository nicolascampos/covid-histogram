import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchResources, setDaysRange } from './constants/actions';

import DaysRangeSelector from './components/DaysRangeSelector/DaysRangeSelector';
import Histogram from './components/Histogram/Histogram';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const { fetchResources, daysRange } = this.props;

    fetchResources(daysRange);
  }

  handleChange(e) {
    const { setDaysRange } = this.props;

    setDaysRange(e.target.value);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="appContainer">
        <h1>Covid Histogram</h1>
        <div className="appContainer_filtersBar">
          <DaysRangeSelector handleChange={this.handleChange.bind(this)} />
        </div>
        <Histogram data={data} />
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
  fetchResources: PropTypes.func.isRequired,
  setDaysRange: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchResources,
  setDaysRange,
};
const mapStateToProps = (state) => ({
  data: state.data,
  daysRange: state.daysRange,
  error: state.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
