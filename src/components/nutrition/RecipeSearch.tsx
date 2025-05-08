import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface RecipeSearchProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({ onSearch, searchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for recipes (e.g., chicken, pasta, salad)..."
          value={inputValue}
          onChange={handleChange}
          className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 focus:outline-none transition-shadow"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className={`absolute inset-y-0 right-0 px-3 text-white rounded-r-lg transition-colors ${
            inputValue.trim() 
              ? 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800' 
              : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default RecipeSearch;