import React from 'react';
import { Recipe } from '../../types/nutrition';
import { Clock, Flame, BarChart3 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.label} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {recipe.dietLabels?.length > 0 && (
          <div className="absolute top-0 right-0 m-2">
            <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
              {recipe.dietLabels[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{recipe.label}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.healthLabels?.slice(0, 3).map((label, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded"
            >
              {label}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Flame className="h-4 w-4 mr-1 text-orange-500" />
            <span>{Math.round(recipe.calories || 0)} cal</span>
          </div>
          
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-1 text-green-500" />
            <span>{recipe.ingredientLines?.length || 0} ingredients</span>
          </div>
          
          {recipe.totalTime > 0 && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              <span>{recipe.totalTime} min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
