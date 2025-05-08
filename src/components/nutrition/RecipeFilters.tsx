import React from 'react';
import { Filter, X } from 'lucide-react';

interface RecipeFiltersProps {
  dietTypes: string[];
  healthLabels: string[];
  mealTypes: string[];
  filters: {
    query: string;
    diet: string;
    health: string;
    mealType: string;
    maxResults: number;
  };
  onFilterChange: (filterType: string, value: string | number) => void;
  onResetFilters: () => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  dietTypes,
  healthLabels,
  mealTypes,
  filters,
  onFilterChange,
  onResetFilters
}) => {
  const hasActiveFilters = filters.diet || filters.health || filters.mealType;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center"
            aria-label="Reset filters"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Diet Type Filter */}
        <div>
          <label htmlFor="diet" className="block text-sm font-medium mb-1">
            Diet Type
          </label>
          <select
            id="diet"
            value={filters.diet}
            onChange={(e) => onFilterChange('diet', e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value="">All Diet Types</option>
            {dietTypes.map((diet) => (
              <option key={diet} value={diet} className="capitalize">
                {diet.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Health Label Filter */}
        <div>
          <label htmlFor="health" className="block text-sm font-medium mb-1">
            Health Label
          </label>
          <select
            id="health"
            value={filters.health}
            onChange={(e) => onFilterChange('health', e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value="">All Health Labels</option>
            {healthLabels.map((health) => (
              <option key={health} value={health} className="capitalize">
                {health.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Meal Type Filter */}
        <div>
          <label htmlFor="mealType" className="block text-sm font-medium mb-1">
            Meal Type
          </label>
          <select
            id="mealType"
            value={filters.mealType}
            onChange={(e) => onFilterChange('mealType', e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value="">All Meal Types</option>
            {mealTypes.map((meal) => (
              <option key={meal} value={meal} className="capitalize">
                {meal}
              </option>
            ))}
          </select>
        </div>

        {/* Results Limit */}
        <div>
          <label htmlFor="maxResults" className="block text-sm font-medium mb-1">
            Max Results
          </label>
          <select
            id="maxResults"
            value={filters.maxResults}
            onChange={(e) => onFilterChange('maxResults', parseInt(e.target.value))}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value={10}>10 recipes</option>
            <option value={20}>20 recipes</option>
            <option value={30}>30 recipes</option>
            <option value={50}>50 recipes</option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.diet && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full flex items-center">
                  Diet: {filters.diet}
                  <button
                    onClick={() => onFilterChange('diet', '')}
                    className="ml-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    aria-label="Remove diet filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.health && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium rounded-full flex items-center">
                  Health: {filters.health}
                  <button
                    onClick={() => onFilterChange('health', '')}
                    className="ml-1 p-0.5 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                    aria-label="Remove health filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.mealType && (
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 text-xs font-medium rounded-full flex items-center">
                  Meal: {filters.mealType}
                  <button
                    onClick={() => onFilterChange('mealType', '')}
                    className="ml-1 p-0.5 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800"
                    aria-label="Remove meal type filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFilters;