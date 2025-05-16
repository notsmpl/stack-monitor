import React from 'react';
import { StockQuote } from '@/lib/api/stocks';
import { MiniChart } from './MiniChart';

interface StockTableProps {
	stocks: StockQuote[];
	sortConfig: {
		key: keyof StockQuote;
		direction: 'asc' | 'desc';
	} | null;
	requestSort: (key: keyof StockQuote) => void;
	onSelectStock: (stock: StockQuote) => void;
}

export const StockTable: React.FC<StockTableProps> = ({
  stocks,
  sortConfig,
  requestSort,
  onSelectStock
}) => {
	const getSortIcon = (key: keyof StockQuote) => {
		if (!sortConfig || sortConfig.key !== key) return null;
		return sortConfig.direction === 'asc' ? '↑' : '↓';
	};

	const generateMiniChartData = (stock: StockQuote) => {
		return [
			stock.previous_close * 0.98,
			stock.previous_close * 0.99,
			stock.open,
			stock.high,
			stock.low,
			stock.close * 0.99,
			stock.close
		];
	};

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
				<tr>
					<th
						className="bg-gray-100 dark:bg-gray-800 p-3 text-left font-semibold text-sm sticky top-0 cursor-pointer"
						onClick={() => requestSort('symbol')}
					>
						Symbol {getSortIcon('symbol')}
					</th>

					<th className="bg-gray-100 dark:bg-gray-800 p-3 text-left font-semibold text-sm sticky top-0">Name</th>

					<th
						className="bg-gray-100 dark:bg-gray-800 p-3 text-left font-semibold text-sm sticky top-0 cursor-pointer"
						onClick={() => requestSort('close')}
					>
						Price {getSortIcon('close')}
					</th>

					<th
						className="bg-gray-100 dark:bg-gray-800 p-3 text-left font-semibold text-sm sticky top-0 cursor-pointer"
						onClick={() => requestSort('change')}
					>
						Change {getSortIcon('change')}
					</th>

					<th className="bg-gray-100 dark:bg-gray-800 p-3 text-left font-semibold text-sm sticky top-0">7D Trend</th>
				</tr>
				</thead>

				<tbody>
				{stocks.map((stock) => (
					<tr
						key={stock?.symbol}
						onClick={() => onSelectStock(stock)}
						className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
					>
						<td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium">
							{stock.symbol}
						</td>

						<td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">
							{stock.name}
						</td>

						<td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">
							${stock.close.toFixed(2)}
						</td>

						<td className={`p-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium ${
							stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
						}`}>
							{stock.change >= 0 ? '+' : ''}
							{stock.change.toFixed(2)} (
							{stock.change >= 0 ? '+' : ''}
							{stock.percent_change.toFixed(2)}%)
						</td>

						<td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">
							<MiniChart
								data={generateMiniChartData(stock)}
								color={stock.change >= 0 ? '#10b981' : '#ef4444'}
							/>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};
