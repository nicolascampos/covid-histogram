import React, { useEffect } from 'react';
import highcharts from 'highcharts';
import moment from 'moment';
import PropTypes from 'prop-types';

const Histogram = ({ data }) => {
  useEffect(() => {
    const days = data.map((day) => moment(day.dateChecked).format('MMM D'));
    const infected = data.map((day) => day.positiveIncrease);
    const deceased = data.map((day) => day.deathIncrease);

    const infectedColor = highcharts.getOptions().colors[0];
    const deceasedColor = highcharts.getOptions().colors[1];

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
        labels: {
          style: {
            color: infectedColor,
          },
        },
        title: {
          text: 'Infected',
          style: {
            color: infectedColor,
          },
        },
      }, {
        labels: {
          style: {
            color: deceasedColor,
          },
        },
        title: {
          text: 'Deceased',
          style: {
            color: deceasedColor,
          },
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
        name: 'Deceased',
        data: deceased,
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
