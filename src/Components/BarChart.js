import React from 'react';

import {Bar} from 'react-chartjs';

export default (props) => {
	let chartData = {
	    labels: [],
	    datasets: [
	        {
	            label: "Results",
	            fillColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	            ],
	            borderWidth: 1,
	            data: [],
	        }
	    ]
	};

	props.data.forEach((data) => {
		chartData.labels.push(data.choice);
		chartData.datasets[0].data.push(data.count);
		console.log(chartData.labels);
	})

	return props.hidden ? null :(
	<Bar data={chartData} />
	);
}