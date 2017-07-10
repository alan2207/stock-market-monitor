import React from 'react';

import {Line} from 'react-chartjs-2';

// generating random colors
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


// transforming data properly
function formatData(data) {
  
  if(data.length) {
    var labels = data[0].dates;
    var datasets = [];

  for(var i = 0; i < data.length; i++) {
    let color = getRandomColor();
    datasets.push({
        label: data[i].symbol,
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[i].series
      });
    }
      return {
      labels,
      datasets
    }
  }   
}


export default (props) => {
  return (
      <div>
        {props.data.length ? <Line data={formatData(props.data)} /> : <p>no data</p>}
      </div>
    );
}

