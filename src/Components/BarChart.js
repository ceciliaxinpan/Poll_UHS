import React from 'react';

import {Bar} from 'react-chartjs';

export default (props) => {
	let chartData = {
	    labels: [],
	    datasets: [
	        {
	            label: "Results",
	            fillColor: [
	                'rgba(204, 0, 0, 1)',
	                'rgba(51, 51, 204, 1)',
	                'rgba(51, 153, 51, 1)',
	                'rgba(255, 102, 0, 1)',
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