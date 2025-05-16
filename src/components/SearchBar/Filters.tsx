import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface FiltersProps {
	filter: 'all' | 'gaining' | 'losing';
	onFilterChange: (filter: 'all' | 'gaining' | 'losing') => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, onFilterChange }) => {
	return (
		<ButtonGroup variant="outlined" aria-label="stock filters">
			<Button
				variant={filter === 'all' ? 'contained' : 'outlined'}
				onClick={() => onFilterChange('all')}
			>
				All
			</Button>
			<Button
				variant={filter === 'gaining' ? 'contained' : 'outlined'}
				color="success"
				onClick={() => onFilterChange('gaining')}
			>
				Gaining
			</Button>
			<Button
				variant={filter === 'losing' ? 'contained' : 'outlined'}
				color="error"
				onClick={() => onFilterChange('losing')}
			>
				Losing
			</Button>
		</ButtonGroup>
	);
};

export default Filters;
