import twelvedata from './twelvedata';
import {calculateMACD, calculateRSI} from "@/lib/utils/indicators";

export interface StockQuote {
	symbol: string;
	name: string;
	exchange: string;
	currency: string;
	datetime: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	previous_close: number;
	change: number;
	percent_change: number;
	is_market_open: boolean;
}

export interface StockHistoricalData {
	datetime: string;
	price: number;
	rsi?: number | null;
	macd?: number | null;
	signal?: number | null;
}

export const fetchStockQuotes = async (symbols: string[]): Promise<StockQuote[]> => {
	const response = await twelvedata.get('/quote', {
		params: { symbol: symbols.join(',') },
	});

	return Object.values(response.data).map((stock: any) => ({
		...stock,
		open: parseFloat(stock.open),
		high: parseFloat(stock.high),
		low: parseFloat(stock.low),
		close: parseFloat(stock.close),
		volume: parseInt(stock.volume),
		previous_close: parseFloat(stock.previous_close),
		change: parseFloat(stock.change),
		percent_change: parseFloat(stock.percent_change),
	}));
};

export const fetchStockHistory = async (
	symbol: string,
	interval: string = '1day',
	outputsize: number = 30
): Promise<StockHistoricalData[]> => {
	try {
		const response = await twelvedata.get('/time_series', {
			params: { symbol, interval, outputsize },
		});

		const values = response.data.values.reverse();
		const prices = values.map((v: any) => parseFloat(v.close));

		const rsi = calculateRSI(prices);
		const { macd, signal } = calculateMACD(prices);

		return values.map((item: any, index: number) => ({
			datetime: item.datetime,
			price: parseFloat(item.close),
			rsi: index < rsi.length ? rsi[index] : undefined,
			macd: index < macd.length ? macd[index] : undefined,
			signal: index < signal.length ? signal[index] : undefined,
		}));
	} catch (error) {
		console.error('Error fetching stock history:', error);
		throw error;
	}
};
