import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface SearchBarProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	filter: 'all' | 'gaining' | 'losing';
	onFilterChange: (filter: 'all' | 'gaining' | 'losing') => void;
	onRefresh: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	searchTerm,
	onSearchChange,
	filter,
	onFilterChange,
	onRefresh
}) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-6">
			<div className="flex-1">
				<input
					type="text"
					placeholder="Search stocks..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="input"
				/>
			</div>

			<div className="flex gap-2 filter-buttons">
				<button
					onClick={() => onFilterChange('all')}
					className={`filter-button ${filter === 'all' ? 'active' : ''}`}
				>
					All
				</button>

				<button
					onClick={() => onFilterChange('gaining')}
					className={`filter-button ${filter === 'gaining' ? 'active' : ''}`}
				>
					Gaining
				</button>

				<button
					onClick={() => onFilterChange('losing')}
					className={`filter-button ${filter === 'losing' ? 'active' : ''}`}
				>
					Losing
				</button>
			</div>

			<button
				onClick={onRefresh}
				className="btn btn-outline flex items-center gap-2 cursor-pointer"
			>
				<FiRefreshCw className="w-4 h-4" />
				Refresh
			</button>
		</div>
	);
};
