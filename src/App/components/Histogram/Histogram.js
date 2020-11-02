import React, { useEffect } from 'react';
import highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown.js';
import moment from 'moment';
import PropTypes from 'prop-types';

drilldown(highcharts);

const Histogram = ({ data, drilldownData, handleDrilldown }) => {
  useEffect(() => {
    const infectedColor = highcharts.getOptions().colors[0];
    const deceasedColor = highcharts.getOptions().colors[1];
    const parsedDays = data.map((day) => moment(day.dateChecked).format('MMM D'));
    const infected = data.map((day) => ({
      date: moment(day.dateChecked).format('YYYY-MM-DD'),
      y: day.positiveIncrease,
      drilldown: true,
    }));
    const deceased = data.map((day) => ({
      date: moment(day.dateChecked).format('YYYY-MM-DD'),
      y: day.deathIncrease,
      drilldown: true,
    }));

    const drilldownCallback = (e) => {
      chart.showLoading('Fetching stats by states...');
      handleDrilldown(e);
      const drilldownSeries = drilldownData.map((item) => ({
        categories: item.region.province
      }));
      setTimeout(() => {
        chart.addSeriesAsDrilldown(e.point, drilldownSeries);
        console.log(drilldownSeries);
        chart.hideLoading();
      }, 4000);
    }

    const options = {
      chart: {
        type: 'column',
        events: {
          drilldown: drilldownCallback,
        },
      },
      title: {
        text: 'Covid statistics in the US',
      },
      tooltip: {
        shared: true,
      },
      xAxis: {
        categories: parsedDays,
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
      drilldown: {
        series: [],
      },
    };

    /* eslint-disable no-unused-vars */
    const chart = highcharts.chart('histogram', options);
  });

  return <div id="histogram" />;
};

// Histogram.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     positiveIncrease: PropTypes.number,
//     deathIncrease: PropTypes.number,
//   })).isRequired,
//   drilldownData: PropTypes.arrayOf(PropTypes.shape({
//     confirmed_diff: PropTypes.number,
//     deaths_diff: PropTypes.number,
//   })),
//   handleDrilldown: PropTypes.func.isRequired,
// };

export default Histogram;
