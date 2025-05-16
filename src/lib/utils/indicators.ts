
export const calculateRSI = (prices: number[], period = 14): number[] => {
	if (prices.length < period + 1) {
		return [];
	}

	const rsi: number[] = [];
	const gains: number[] = [];
	const losses: number[] = [];

	for (let i = 1; i < prices.length; i++) {
		const change = prices[i] - prices[i - 1];
		gains.push(change > 0 ? change : 0);
		losses.push(change < 0 ? Math.abs(change) : 0);
	}

	let avgGain = gains.slice(0, period).reduce((sum, val) => sum + val, 0) / period;
	let avgLoss = losses.slice(0, period).reduce((sum, val) => sum + val, 0) / period;


	rsi.push(avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss)));


	for (let i = period; i < gains.length; i++) {
		avgGain = (avgGain * (period - 1) + gains[i]) / period;
		avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

		const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
		rsi.push(100 - (100 / (1 + rs)));
	}

	return rsi;
};

const calculateEMA = (prices: number[], period: number): number[] => {
	if (prices.length < period) {
		return [];
	}

	const k = 2 / (period + 1);
	const ema: number[] = [];

	let sum = 0;
	for (let i = 0; i < period; i++) {
		sum += prices[i];
	}
	ema.push(sum / period);

	for (let i = period; i < prices.length; i++) {
		ema.push(prices[i] * k + ema[ema.length - 1] * (1 - k));
	}

	return ema;
};

export const calculateMACD = (
	prices: number[],
	fastPeriod = 12,
	slowPeriod = 26,
	signalPeriod = 9
) => {
	const emaFast = calculateEMA(prices, fastPeriod);
	const emaSlow = calculateEMA(prices, slowPeriod);

	const macd: number[] = [];
	const commonLength = Math.min(emaFast.length, emaSlow.length);

	for (let i = 0; i < commonLength; i++) {
		macd.push(emaFast[i] - emaSlow[i]);
	}

	const signal = calculateEMA(macd, signalPeriod);

	const histogram: number[] = [];
	const startIndex = macd.length - signal.length;

	for (let i = 0; i < signal.length; i++) {
		if (startIndex + i >= 0) {
			histogram.push(macd[startIndex + i] - signal[i]);
		}
	}

	return {
		macd,
		signal,
		histogram
	};
};
