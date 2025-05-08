export interface Recipe {
  id: number;
  label: string;
  image: string;
  calories: number;
  ingredientLines: string[];
  totalTime: number;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  totalNutrients: {
    PROCNT?: { quantity: number };
    CHOCDF?: { quantity: number };
    FAT?: { quantity: number };
    FIBTG?: { quantity: number };
    SUGAR?: { quantity: number };
    CHOLE?: { quantity: number };
    NA?: { quantity: number };
  };
  url: string;
}
