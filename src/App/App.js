import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchResources } from './constants/actions';

import Histogram from './components/Histogram/Histogram';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const { getData } = this.props;

    getData();
  }

  render() {
    const { data } = this.props;

    return (
      <div className="container">
        <h1>Covid Histogram</h1>
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
  error: PropTypes.string,
  getData: PropTypes.func.isRequired,
};

const mapDispatchToProps = { getData: fetchResources };
const mapStateToProps = (state) => ({
  data: state.data,
  error: state.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
