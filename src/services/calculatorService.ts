interface CalorieParams {
  age: number;
  gender: 'male' | 'female';
  weight: number;  // in kg
  height: number;  // in cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very';
  goal: 'maintain' | 'lose' | 'gain';
}

interface CalorieResult {
  bmr: number;
  maintenance: number;
  goal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const calculateCalories = (params: CalorieParams): CalorieResult => {
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = 0;
  
  if (params.gender === 'male') {
    bmr = (10 * params.weight) + (6.25 * params.height) - (5 * params.age) + 5;
  } else {
    bmr = (10 * params.weight) + (6.25 * params.height) - (5 * params.age) - 161;
  }
  
  // Apply activity multiplier
  let maintenanceCalories = 0;
  
  switch (params.activityLevel) {
    case 'sedentary':
      maintenanceCalories = bmr * 1.2;
      break;
    case 'light':
      maintenanceCalories = bmr * 1.375;
      break;
    case 'moderate':
      maintenanceCalories = bmr * 1.55;
      break;
    case 'active':
      maintenanceCalories = bmr * 1.725;
      break;
    case 'very':
      maintenanceCalories = bmr * 1.9;
      break;
    default:
      maintenanceCalories = bmr * 1.2;
  }
  
  // Adjust for goal
  let goalCalories = 0;
  
  switch (params.goal) {
    case 'lose':
      goalCalories = maintenanceCalories - 500; // 500 calorie deficit (approximately 1lb/week)
      break;
    case 'gain':
      goalCalories = maintenanceCalories + 500; // 500 calorie surplus
      break;
    default:
      goalCalories = maintenanceCalories;
  }
  
  // Calculate macronutrients
  // Protein: 2g per kg of bodyweight (or more for building muscle/cutting)
  let proteinG = 0;
  
  if (params.goal === 'gain') {
    proteinG = params.weight * 2.2; // Higher protein for muscle gain
  } else if (params.goal === 'lose') {
    proteinG = params.weight * 2.5; // Higher protein for weight loss to preserve muscle
  } else {
    proteinG = params.weight * 1.8; // Moderate protein for maintenance
  }
  
  // Fat: 25-35% of calories
  let fatPercentage = 0;
  
  if (params.goal === 'lose') {
    fatPercentage = 0.25; // Lower fat for cutting
  } else {
    fatPercentage = 0.3; // Moderate fat for maintenance or bulking
  }
  
  const fatCalories = goalCalories * fatPercentage;
  const fatG = fatCalories / 9; // 9 calories per gram of fat
  
  // Protein calories
  const proteinCalories = proteinG * 4; // 4 calories per gram of protein
  
  // Rest is carbs
  const carbCalories = goalCalories - proteinCalories - fatCalories;
  const carbG = carbCalories / 4; // 4 calories per gram of carbs
  
  return {
    bmr: bmr,
    maintenance: maintenanceCalories,
    goal: goalCalories,
    protein: proteinG,
    carbs: carbG,
    fat: fatG
  };
};