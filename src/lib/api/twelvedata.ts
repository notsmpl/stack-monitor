import axios from 'axios';

const BASE_URL = 'https://api.twelvedata.com';

const instance = axios.create({
	baseURL: BASE_URL,
	params: {
		apikey: process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY,
		source: 'docs',
	},
});

export default instance;
