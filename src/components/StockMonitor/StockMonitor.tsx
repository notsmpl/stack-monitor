"use client";

import {useEffect} from "react";
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';

import { StockTable } from '@/components/StockTable/StockTable';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { StockChart } from '@/components/StockChart/StockChart';

import { useStocks } from '@/lib/hooks/useStocks';

export default function StockMonitor() {
	const {
		stocks,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		filter,
		setFilter,
		sortConfig,
		requestSort,
		selectedStock,
		historicalData,
		showIndicators,
		setShowIndicators,
		handleSelectStock,
		refresh,
	} = useStocks();

	useEffect(() => {
		const interval = setInterval(() => {
			refresh();
		}, 60000);

		return () => clearInterval(interval);
	}, [refresh]);

	return (
		<>
			<SearchBar
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				filter={filter}
				onFilterChange={setFilter}
				onRefresh={refresh}
			/>

			{loading && !stocks.length ? (
				<Box display="flex" justifyContent="center" p={4}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			) : (
				<>
					<StockTable
						stocks={stocks}
						sortConfig={sortConfig}
						requestSort={requestSort}
						onSelectStock={handleSelectStock}
					/>

					{selectedStock && historicalData.length > 0 && (
						<Box mt={4}>
							<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
								<Typography variant="h5">
									{selectedStock.name} ({selectedStock.symbol}) - Historical Data
								</Typography>
								<Button
									variant="outlined"
									onClick={() => setShowIndicators(!showIndicators)}
								>
									{showIndicators ? 'Hide Indicators' : 'Show Technical Indicators'}
								</Button>
							</Box>

							<StockChart
								symbol={selectedStock.symbol}
								historicalData={historicalData}
								showIndicators={showIndicators}
							/>
						</Box>
					)}
				</>
			)}
		</>
	);
}
