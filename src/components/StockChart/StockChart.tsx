import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { Box } from '@mui/material';
import {StockHistoricalData} from "@/lib/api/stocks";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

interface StockChartProps {
	symbol: string;
	historicalData: StockHistoricalData[];
	showIndicators?: boolean;
}

const priceChartOptions = {
	responsive: true,
	plugins: {
		title: { display: true, text: 'Price History' },
		tooltip: {
			callbacks: {
				label: (context: any) => `$${context.parsed.y.toFixed(2)}`
			}
		}
	},
	scales: {
		x: { display: false },
		y: { title: { display: true, text: 'Price ($)' } }
	}
};

const indicatorsOptions = {
	responsive: true,
	plugins: {
		title: { display: true, text: 'Technical Indicators' },
	},
	scales: {
		x: { display: false },
		y: {
			min: 0,
			max: 100,
			title: { display: true, text: 'RSI / MACD' }
		}
	}
};

export const StockChart: React.FC<StockChartProps> = ({
  symbol,
  historicalData,
  showIndicators = false
}) => {
	const priceData = {
		labels: historicalData.map(d => d.datetime),
		datasets: [{
			label: `${symbol} Price`,
			data: historicalData.map(d => d.price),
			borderColor: 'rgb(53, 162, 235)',
			backgroundColor: 'rgba(53, 162, 235, 0.1)',
			borderWidth: 2,
			fill: true
		}]
	};

	const indicatorsData = {
		labels: historicalData.map(d => d.datetime),
		datasets: [
			{
				label: 'RSI (14)',
				data: historicalData.map(d => d.rsi),
				borderColor: 'rgb(255, 99, 132)',
				borderWidth: 1,
			},
			{
				label: 'MACD',
				data: historicalData.map(d => d.macd),
				borderColor: 'rgb(75, 192, 192)',
				borderWidth: 1,
			},
			{
				label: 'Signal',
				data: historicalData.map(d => d.signal),
				borderColor: 'rgb(153, 102, 255)',
				borderWidth: 1,
			}
		]
	};

	return (
		<Box>
			<Box mb={4}>
				<Line options={priceChartOptions} data={priceData} />
			</Box>

			{showIndicators && (
				<Box mt={4}>
					<Line options={indicatorsOptions} data={indicatorsData} />
				</Box>
			)}
		</Box>
	);
};
