import axios from 'axios';
import { Recipe } from '../types/nutrition';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const fetchRecipes = async (
  query: string,
  diet: string,
  health: string,
  mealType: string,
  maxResults: number
): Promise<Recipe[]> => {
  try {
    const params: Record<string, string | number | boolean> = {
      query,
      number: maxResults,
      apiKey: API_KEY,
      addRecipeNutrition: true,
    };

    if (diet) params.diet = diet;
    if (health) params.intolerances = health;
    if (mealType) params.type = mealType;

    const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params,
    });

    const recipes = res.data.results;

    return recipes.map((item: any) => {
      const nutrients = item.nutrition?.nutrients || [];

      const getNutrient = (name: string) =>
        nutrients.find((n: any) => n.name === name)?.amount || 0;

      return {
        id: item.id,
        label: item.title,
        image: item.image,
        dietLabels: item.diets || [],
        healthLabels: [health], // fallback since Spoonacular doesn't return this directly
        calories: getNutrient('Calories'),
        ingredientLines: item.nutrition?.ingredients?.map((ing: any) => ing.name) || [],
        totalTime: item.readyInMinutes || 0,
        yield: item.servings || 1,
        totalNutrients: {
          PROCNT: { quantity: getNutrient('Protein') },
          CHOCDF: { quantity: getNutrient('Carbohydrates') },
          FAT: { quantity: getNutrient('Fat') },
          FIBTG: { quantity: getNutrient('Fiber') },
          SUGAR: { quantity: getNutrient('Sugar') },
          CHOLE: { quantity: getNutrient('Cholesterol') },
          NA: { quantity: getNutrient('Sodium') },
        },
        cautions: [],
        url: `https://spoonacular.com/recipes/${item.title.replace(/\s+/g, '-').toLowerCase()}-${item.id}`,
      };
    });
  } catch (error) {
    console.error('Error fetching Spoonacular recipes:', error);
    throw error;
  }
};
