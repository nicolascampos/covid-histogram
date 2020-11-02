import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
  fetchResources,
  setDaysRange,
  fetchDrilldownData,
} from './constants/actions';

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

  handleDrilldown(e) {
    const { fetchDrilldownData } = this.props;

    fetchDrilldownData(e.point.date);
  }

  render() {
    const {
      data,
      drilldownData
    } = this.props;

    return (
      <div className="appContainer">
        <h1>Covid Histogram</h1>
        <div className="appContainer_filtersBar">
          <DaysRangeSelector handleChange={this.handleChange.bind(this)} />
        </div>
        <Histogram
          data={data}
          drilldownData={drilldownData}
          handleDrilldown={this.handleDrilldown.bind(this)}
        />
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
  fetchDrilldownData,
  fetchResources,
  setDaysRange,
};
const mapStateToProps = (state) => ({
  data: state.data,
  drilldownData: state.drilldownData,
  daysRange: state.daysRange,
  error: state.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
