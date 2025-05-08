import React, { useState, useEffect } from 'react';
import ExerciseList from '../components/exercise/ExerciseList';
import ExerciseSearch from '../components/exercise/ExerciseSearch';
import ExerciseFilters from '../components/exercise/ExerciseFilters';
import { fetchExercises, fetchBodyParts, fetchEquipment, fetchTargetMuscles } from '../services/exerciseService';
import { Exercise, BodyPart, Equipment, TargetMuscle } from '../types/exercise';
import Loader from '../components/ui/Loader';

const ExercisePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [targetMuscles, setTargetMuscles] = useState<TargetMuscle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    search: '',
    bodyPart: '',
    equipment: '',
    targetMuscle: ''
  });

  useEffect(() => {
    const loadExerciseData = async () => {
      try {
        setLoading(true);
        const [exercisesData, bodyPartsData, equipmentData, targetMusclesData] = await Promise.all([
          fetchExercises(),
          fetchBodyParts(),
          fetchEquipment(),
          fetchTargetMuscles()
        ]);
        
        setExercises(exercisesData);
        setFilteredExercises(exercisesData);
        setBodyParts(bodyPartsData);
        setEquipment(equipmentData);
        setTargetMuscles(targetMusclesData);
        setError(null);
      } catch (err) {
        setError('Failed to load exercise data. Please try again later.');
        console.error('Error loading exercise data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadExerciseData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, exercises]);

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const applyFilters = () => {
    let results = [...exercises];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply body part filter
    if (filters.bodyPart) {
      results = results.filter(exercise => 
        exercise.bodyPart === filters.bodyPart
      );
    }
    
    // Apply equipment filter
    if (filters.equipment) {
      results = results.filter(exercise => 
        exercise.equipment === filters.equipment
      );
    }
    
    // Apply target muscle filter
    if (filters.targetMuscle) {
      results = results.filter(exercise => 
        exercise.target === filters.targetMuscle
      );
    }
    
    setFilteredExercises(results);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      bodyPart: '',
      equipment: '',
      targetMuscle: ''
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Exercise Library</h1>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <ExerciseSearch onSearch={handleSearch} searchTerm={filters.search} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ExerciseFilters 
            bodyParts={bodyParts}
            equipment={equipment}
            targetMuscles={targetMuscles}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>
        <div className="lg:col-span-3">
          <ExerciseList exercises={filteredExercises} />
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;