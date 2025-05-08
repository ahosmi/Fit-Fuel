import React, { useState, useEffect } from 'react';
import RecipeList from '../components/nutrition/RecipeList';
import RecipeSearch from '../components/nutrition/RecipeSearch';
import RecipeFilters from '../components/nutrition/RecipeFilters';
import { fetchRecipes } from '../services/nutritionService';
import { Recipe } from '../types/nutrition';
import Loader from '../components/ui/Loader';

const dietTypes = [
  'balanced', 'high-protein', 'low-fat', 'low-carb', 'vegan', 'vegetarian',
  'pescatarian', 'paleo', 'keto', 'gluten-free'
];

const healthLabels = [
  'sugar-conscious', 'dairy-free', 'gluten-free', 'wheat-free', 
  'egg-free', 'peanut-free', 'tree-nut-free', 'soy-free', 'fish-free', 
  'shellfish-free'
];

const mealTypes = [
  'breakfast', 'lunch', 'dinner', 'snack'
];

const NutritionPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    query: '',
    diet: '',
    health: '',
    mealType: '',
    maxResults: 20
  });

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, query: searchTerm }));
  };

  const handleFilterChange = (filterType: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      diet: '',
      health: '',
      mealType: '',
      maxResults: 20
    });
  };

  const searchRecipes = async () => {
    if (!filters.query) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchRecipes(
        filters.query,
        filters.diet,
        filters.health,
        filters.mealType,
        filters.maxResults
      );
      
      setRecipes(data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters.query) {
      searchRecipes();
    }
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Nutrition & Recipes</h1>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <RecipeSearch 
          onSearch={handleSearch} 
          searchTerm={filters.query} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <RecipeFilters 
            dietTypes={dietTypes}
            healthLabels={healthLabels}
            mealTypes={mealTypes}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <Loader />
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;