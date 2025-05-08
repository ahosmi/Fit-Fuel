import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ExerciseSearchProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

const ExerciseSearch: React.FC<ExerciseSearchProps> = ({ onSearch, searchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search exercises..."
          value={inputValue}
          onChange={handleChange}
          className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 focus:outline-none transition-shadow"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-3 bg-blue-600 dark:bg-blue-700 text-white rounded-r-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default ExerciseSearch;