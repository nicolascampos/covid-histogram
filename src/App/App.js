import React from 'react';
import { connect } from 'react-redux';

import { fetchResources } from './constants/actions';

import Histogram from './components/Histogram/Histogram';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchResources();
  }

  render() {
    return (
      <div className="container">
        <Histogram data={this.props.data} />
      </div>
    );
  }
}

const mapDispatchToProps = { fetchResources };

const mapStateToProps = (state) => {
  return {
    data: state.data,
    error: state.error
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
  