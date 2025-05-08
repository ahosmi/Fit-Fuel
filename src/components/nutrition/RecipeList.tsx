import React, { useState } from 'react';
import { Recipe } from '../../types/nutrition';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [page, setPage] = useState(1);
  const recipesPerPage = 9;

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeDetail = () => {
    setSelectedRecipe(null);
  };

  // Calculate pagination
  const indexOfLastRecipe = page * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  if (recipes.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
        <h3 className="text-xl font-medium mb-2">No recipes found</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {recipes.length === 0 && !selectedRecipe ? 
            "Search for recipes to get started." : 
            "Try adjusting your filters or search term."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {indexOfFirstRecipe + 1}-{Math.min(indexOfLastRecipe, recipes.length)} of {recipes.length} recipes
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRecipes.map(recipe => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
            onClick={() => handleRecipeClick(recipe)}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md ${
                page === 1 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 rounded-md ${
                  pageNum === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md ${
                page === totalPages 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
      
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={closeDetail}
        />
      )}
    </div>
  );
};

export default RecipeList;