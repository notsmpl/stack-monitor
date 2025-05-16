"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
	fetchStockQuotes,
	fetchStockHistory,
	StockQuote,
	StockHistoricalData
} from '../api/stocks';
import debounce from 'lodash.debounce';

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];

export const useStocks = (initialSymbols = DEFAULT_SYMBOLS) => {
	const [quotes, setQuotes] = useState<StockQuote[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState<'all' | 'gaining' | 'losing'>('all');
	const [sortConfig, setSortConfig] = useState<{
		key: keyof StockQuote;
		direction: 'asc' | 'desc';
	} | null>(null);
	const [selectedStock, setSelectedStock] = useState<StockQuote | null>(null);
	const [historicalData, setHistoricalData] = useState<StockHistoricalData[]>([]);
	const [showIndicators, setShowIndicators] = useState(false);

	const loadQuotes = useMemo(() =>
			debounce(async (symbols: string[]) => {
				try {
					setLoading(true);
					const data = await fetchStockQuotes(symbols);
					setQuotes(data);
					setError(null);
				} catch (err) {
					setError(err instanceof Error ? err.message : 'Failed to load data');
				} finally {
					setLoading(false);
				}
			}, 500),
		[]);

	const loadHistory = useCallback(async (symbol: string) => {
		try {
			const data = await fetchStockHistory(symbol);
			setHistoricalData(data);
		} catch (err) {
			console.error('Failed to load history:', err);
		}
	}, []);

	useEffect(() => {
		loadQuotes(initialSymbols);
	}, [initialSymbols, loadQuotes]);

	const handleSelectStock = (stock: StockQuote) => {
		setSelectedStock(stock);
		loadHistory(stock.symbol);
	};

	const requestSort = (key: keyof StockQuote) => {
		setSortConfig(prev => ({
			key,
			direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
		}));
	};

	const processedStocks = useMemo(() => {
		let result = [...quotes];

		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			result = result.filter(stock =>
				stock.symbol.toLowerCase().includes(term) ||
				stock.name.toLowerCase().includes(term))
		}

		if (filter !== 'all') {
			result = result.filter(stock =>
				filter === 'gaining' ? stock.change >= 0 : stock.change < 0
			);
		}

		if (sortConfig) {
			result.sort((a, b) => {
				const aValue = a[sortConfig.key];
				const bValue = b[sortConfig.key];

				if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
				if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return result;
	}, [quotes, searchTerm, filter, sortConfig]);

	return {
		stocks: processedStocks,
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
		refresh: () => loadQuotes(initialSymbols),
	};
};
