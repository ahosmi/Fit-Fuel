import React from 'react';
import { Filter, X } from 'lucide-react';
import { BodyPart, Equipment, TargetMuscle } from '../../types/exercise';

interface ExerciseFiltersProps {
  bodyParts: BodyPart[];
  equipment: Equipment[];
  targetMuscles: TargetMuscle[];
  filters: {
    bodyPart: string;
    equipment: string;
    targetMuscle: string;
    search: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onResetFilters: () => void;
}

const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  bodyParts,
  equipment,
  targetMuscles,
  filters,
  onFilterChange,
  onResetFilters
}) => {
  const hasActiveFilters = filters.bodyPart || filters.equipment || filters.targetMuscle;

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
        {/* Body Part Filter */}
        <div>
          <label htmlFor="bodyPart" className="block text-sm font-medium mb-1">
            Body Part
          </label>
          <select
            id="bodyPart"
            value={filters.bodyPart}
            onChange={(e) => onFilterChange('bodyPart', e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value="">All Body Parts</option>
            {bodyParts.map((bodyPart) => (
              <option key={bodyPart} value={bodyPart} className="capitalize">
                {bodyPart}
              </option>
            ))}
          </select>
        </div>

        {/* Equipment Filter */}
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium mb-1">
            Equipment
          </label>
          <select
            id="equipment"
            value={filters.equipment}
            onChange={(e) => onFilterChange('equipment', e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value="">All Equipment</option>
            {equipment.map((equip) => (
              <option key={equip} value={equip} className="capitalize">
                {equip}
              </option>
            ))}
          </select>
        </div>

        {/* Target Muscle Filter */}
        <div>
          <label htmlFor="targetMuscle" className="block text-sm font-medium mb-1">
            Target Muscle
          </label>
          <select
            id="targetMuscle"
            value={filters.targetMuscle}
            onChange={(e) => onFilterChange('targetMuscle', e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
          >
            <option value="">All Target Muscles</option>
            {targetMuscles.map((muscle) => (
              <option key={muscle} value={muscle} className="capitalize">
                {muscle}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.bodyPart && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full flex items-center">
                  Body Part: {filters.bodyPart}
                  <button
                    onClick={() => onFilterChange('bodyPart', '')}
                    className="ml-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    aria-label="Remove body part filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.equipment && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium rounded-full flex items-center">
                  Equipment: {filters.equipment}
                  <button
                    onClick={() => onFilterChange('equipment', '')}
                    className="ml-1 p-0.5 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                    aria-label="Remove equipment filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.targetMuscle && (
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 text-xs font-medium rounded-full flex items-center">
                  Target: {filters.targetMuscle}
                  <button
                    onClick={() => onFilterChange('targetMuscle', '')}
                    className="ml-1 p-0.5 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800"
                    aria-label="Remove target muscle filter"
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

export default ExerciseFilters;