import React from 'react';
import { Recipe } from '../../types/nutrition';
import { X, Clock, Flame, Users, Tag, Link2 } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatNutrient = (value: number) => {
    return Math.round(value);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold line-clamp-1">{recipe.label}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <img 
                src={recipe.image} 
                alt={recipe.label} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.dietLabels?.map((label, index) => (
                  <span 
                    key={`diet-${index}`} 
                    className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium rounded"
                  >
                    {label}
                  </span>
                ))}
                {recipe.healthLabels?.slice(0, 5).map((label, index) => (
                  <span 
                    key={`health-${index}`} 
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded"
                  >
                    {label}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <div className="font-semibold">{Math.round(recipe.calories || 0)}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">CALORIES</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="font-semibold">{recipe.totalTime || 'N/A'}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">MINUTES</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="font-semibold">{recipe.yield || 'N/A'}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">SERVINGS</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
              <ul className="space-y-2 mb-6">
                {recipe.ingredientLines?.map((ingredient, index) => (
                  <li key={index} className="flex">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-4">Nutrition Facts</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="font-semibold mb-2">Macronutrients</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.PROCNT?.quantity || 0)}g</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.CHOCDF?.quantity || 0)}g</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.FAT?.quantity || 0)}g</div>
                  </div>
                </div>
                
                <div className="font-semibold mb-2">Additional</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fiber</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.FIBTG?.quantity || 0)}g</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sugar</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.SUGAR?.quantity || 0)}g</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cholesterol</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.CHOLE?.quantity || 0)}mg</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sodium</div>
                    <div className="font-medium">{formatNutrient(recipe.totalNutrients?.NA?.quantity || 0)}mg</div>
                  </div>
                </div>
              </div>
              
              {recipe.url && (
                <div className="mt-6">
                  <a 
                    href={recipe.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    View Full Recipe
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {recipe.cautions && recipe.cautions.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg">
              <h4 className="font-semibold flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Cautions
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {recipe.cautions.map((caution, index) => (
                  <span key={index} className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded">
                    {caution}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
