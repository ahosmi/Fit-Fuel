import React, { useState } from 'react';
import { calculateCalories } from '../services/calculatorService';

interface FormData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
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

const CalculatorPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    goal: 'maintain'
  });
  
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [isMetric, setIsMetric] = useState<boolean>(true);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' || name === 'activityLevel' || name === 'goal' 
        ? value 
        : Number(value)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert to metric if using imperial
    const weight = isMetric ? formData.weight : formData.weight * 0.453592; // lbs to kg
    const height = isMetric ? formData.height : formData.height * 2.54; // inches to cm
    
    const calculatedResult = calculateCalories({
      ...formData,
      weight,
      height
    });
    
    setResult(calculatedResult);
  };
  
  const toggleUnit = () => {
    // Convert values when switching units
    if (isMetric) {
      // Convert to imperial
      setFormData(prev => ({
        ...prev,
        weight: Math.round(prev.weight * 2.20462), // kg to lbs
        height: Math.round(prev.height / 2.54) // cm to inches
      }));
    } else {
      // Convert to metric
      setFormData(prev => ({
        ...prev,
        weight: Math.round(prev.weight * 0.453592), // lbs to kg
        height: Math.round(prev.height * 2.54) // inches to cm
      }));
    }
    
    setIsMetric(!isMetric);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Calorie Calculator</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Calculate your daily caloric needs based on your personal data and fitness goals using the Mifflin-St Jeor equation.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={toggleUnit}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
              >
                {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
              </button>
            </div>
            
            {/* Age Input */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-1">
                Age (years)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="15"
                max="80"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
                required
              />
            </div>
            
            {/* Gender Selection */}
            <div>
              <span className="block text-sm font-medium mb-1">Gender</span>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  Female
                </label>
              </div>
            </div>
            
            {/* Weight Input */}
            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-1">
                Weight ({isMetric ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min={isMetric ? 40 : 88}
                max={isMetric ? 200 : 440}
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
                required
              />
            </div>
            
            {/* Height Input */}
            <div>
              <label htmlFor="height" className="block text-sm font-medium mb-1">
                Height ({isMetric ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                id="height"
                name="height"
                min={isMetric ? 140 : 55}
                max={isMetric ? 220 : 87}
                value={formData.height}
                onChange={handleInputChange}
                className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
                required
              />
            </div>
            
            {/* Activity Level */}
            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium mb-1">
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
                className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very">Very Active (hard exercise daily)</option>
              </select>
            </div>
            
            {/* Goal */}
            <div>
              <label htmlFor="goal" className="block text-sm font-medium mb-1">
                Fitness Goal
              </label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full p-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600"
              >
                <option value="maintain">Maintain Weight</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Calculate
            </button>
          </form>
        </div>
        
        {result && (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 border-t dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4">Your Results</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Calorie Calculations</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Basal Metabolic Rate:</span>
                    <span className="font-medium">{Math.round(result.bmr)} calories</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Maintenance Calories:</span>
                    <span className="font-medium">{Math.round(result.maintenance)} calories</span>
                  </li>
                  <li className="flex justify-between font-semibold text-lg pt-2 border-t dark:border-gray-700">
                    <span className={goalColorClass(formData.goal)}>
                      {goalLabel(formData.goal)} Calories:
                    </span>
                    <span className={goalColorClass(formData.goal)}>{Math.round(result.goal)} calories</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Macronutrient Breakdown</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Protein:</span>
                    <span className="font-medium">{Math.round(result.protein)}g ({Math.round(result.protein * 4)} cal)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Carbohydrates:</span>
                    <span className="font-medium">{Math.round(result.carbs)}g ({Math.round(result.carbs * 4)} cal)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Fat:</span>
                    <span className="font-medium">{Math.round(result.fat)}g ({Math.round(result.fat * 9)} cal)</span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <h4 className="font-medium mb-2">Daily Macros</h4>
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500" 
                      style={{ width: `${(result.protein * 4 / result.goal) * 100}%` }}
                      title={`Protein: ${Math.round((result.protein * 4 / result.goal) * 100)}%`}
                    ></div>
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${(result.carbs * 4 / result.goal) * 100}%` }}
                      title={`Carbs: ${Math.round((result.carbs * 4 / result.goal) * 100)}%`}
                    ></div>
                    <div 
                      className="bg-orange-500" 
                      style={{ width: `${(result.fat * 9 / result.goal) * 100}%` }}
                      title={`Fat: ${Math.round((result.fat * 9 / result.goal) * 100)}%`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Protein</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Carbs</span>
                    <span className="text-orange-600 dark:text-orange-400 font-medium">Fat</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {getRecommendation(formData.goal, formData.activityLevel)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const goalLabel = (goal: string): string => {
  switch (goal) {
    case 'lose': return 'Weight Loss';
    case 'gain': return 'Weight Gain';
    default: return 'Maintenance';
  }
};

const goalColorClass = (goal: string): string => {
  switch (goal) {
    case 'lose': return 'text-green-600 dark:text-green-400';
    case 'gain': return 'text-blue-600 dark:text-blue-400';
    default: return 'text-gray-900 dark:text-white';
  }
};

const getRecommendation = (goal: string, activityLevel: string): string => {
  switch (goal) {
    case 'lose':
      return 'For safe and sustainable weight loss, aim to lose 0.5-1kg (1-2lbs) per week. Focus on protein intake to preserve muscle mass, and prioritize strength training alongside cardio. Ensure you\'re getting adequate rest and staying hydrated.';
    case 'gain':
      return 'For muscle gain, ensure you\'re consuming enough protein (as shown above) and focus on progressive overload in your strength training. Aim to gain 0.25-0.5kg (0.5-1lb) per week to minimize fat gain. Prioritize sleep for optimal recovery.';
    default:
      if (activityLevel === 'sedentary' || activityLevel === 'light') {
        return 'Consider increasing your physical activity to improve overall health. Aim for at least 150 minutes of moderate exercise per week, and include both cardiovascular and strength training exercises.';
      } else {
        return 'You have a good activity level. Focus on maintaining a balanced diet with adequate protein intake. Consider periodizing your nutrition based on training intensity to optimize performance and recovery.';
      }
  }
};

export default CalculatorPage;