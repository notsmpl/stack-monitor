"use client";

import React from "react";
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip
} from 'chart.js';


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip
);

interface MiniChartProps {
	data: number[];
	color?: string;
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, color = '#4CAF50' }) => {
	const chartData = {
		labels: data.map((_, i) => i),
		datasets: [{
			data,
			borderColor: color,
			borderWidth: 1.5,
			tension: 0.4,
			pointRadius: 0
		}]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false } },
		scales: { x: { display: false }, y: { display: false } }
	};

	return (
		<div className="h-8 w-20">
			<Line data={chartData} options={options} />
		</div>
	);
};
