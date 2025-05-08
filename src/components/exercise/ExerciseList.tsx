import React, { useState } from 'react';
import { Exercise } from '../../types/exercise';
import ExerciseCard from './ExerciseCard';
import ExerciseDetail from './ExerciseDetail';

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [page, setPage] = useState(1);
  const exercisesPerPage = 9;

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const closeDetail = () => {
    setSelectedExercise(null);
  };

  // Calculate pagination
  const indexOfLastExercise = page * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  return (
    <div>
      {exercises.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-xl font-medium">No exercises found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {indexOfFirstExercise + 1}-{Math.min(indexOfLastExercise, exercises.length)} of {exercises.length} exercises
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentExercises.map(exercise => (
              <ExerciseCard 
                key={exercise.id} 
                exercise={exercise}
                onClick={() => handleExerciseClick(exercise)}
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
        </>
      )}
      
      {selectedExercise && (
        <ExerciseDetail 
          exercise={selectedExercise} 
          onClose={closeDetail} 
        />
      )}
    </div>
  );
};

export default ExerciseList;