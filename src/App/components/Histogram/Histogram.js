import React, { useEffect } from 'react';
import highcharts from 'highcharts';
import moment from 'moment';
import PropTypes from 'prop-types';

const Histogram = ({ data }) => {
  useEffect(() => {
    const days = data.map((day) => moment(day.dateChecked).format('MMM D'));
    const infected = data.map((day) => day.positiveIncrease);
    const deseased = data.map((day) => day.deathIncrease);

    /* eslint-disable no-unused-vars */
    const chart = highcharts.chart('histogram', {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Covid statistics in the US',
      },
      tooltip: {
        shared: true,
      },
      xAxis: {
        categories: days,
      },
      yAxis: [{
        title: {
          text: 'Infected',
        },
      }, {
        title: {
          text: 'Diseased',
        },
        opposite: true,
      }],
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false,
        },
      },
      series: [{
        name: 'Infected',
        data: infected,
      }, {
        name: 'Diseased',
        data: deseased,
        type: 'line',
        yAxis: 1,
      }],
    });
  });

  return <div id="histogram" />;
};

Histogram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    positiveIncrease: PropTypes.number,
    deathIncrease: PropTypes.number,
  })).isRequired,
};

export default Histogram;
