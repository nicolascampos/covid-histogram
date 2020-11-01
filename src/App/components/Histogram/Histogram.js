import React, { useEffect } from 'react';
import highcharts from 'highcharts';
import moment from 'moment';

const Histogram = ({ data }) => {
  useEffect(() => {
    const days = data.map((day) => moment(day.dateChecked).format('MMM D'));
    const infected = data.map((day) => day.positiveIncrease);
    const deseased = data.map((day) => day.deathIncrease);

    const chart = highcharts.chart('histogram', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Covid infected in the US'
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        categories: days
      },
      yAxis: [{
        title: {
          text: 'Infected'
        },
      }, {
        title: {
          text: 'Diseased'
        },
        opposite: true
      }],
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        }
      },
      series: [{
        name: 'Infected',
        data: infected
      }, {
        name: 'Diseased',
        data: deseased,
        type: 'line',
        yAxis: 1
      }],
    });
  });

  return <div id="histogram"></div>;
}

export default Histogram;