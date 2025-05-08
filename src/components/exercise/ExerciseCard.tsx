import React from 'react';
import { Exercise } from '../../types/exercise';
import { Dumbbell, Target, Users } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
        <img 
          src={exercise.gifUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex space-x-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
            {exercise.bodyPart}
          </span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium rounded">
            {exercise.target}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2 capitalize">{exercise.name}</h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-2" />
            <span className="capitalize">{exercise.equipment}</span>
          </div>
          <div className="flex items-center">
            <Target className="h-4 w-4 mr-2" />
            <span className="capitalize">{exercise.target}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span className="capitalize">{exercise.bodyPart}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;