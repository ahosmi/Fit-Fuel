import React, { useEffect, useState } from 'react';
import { Exercise } from '../../types/exercise';
import { X, Play, Dumbbell, Target, Users } from 'lucide-react';
import { fetchSimilarExercises, fetchExerciseVideos } from '../../services/exerciseService';
import Loader from '../ui/Loader';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
}

interface Video {
  id: string;
  title: string;
  channelName: string;
  thumbnailUrl: string;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, onClose }) => {
  const [similarExercises, setSimilarExercises] = useState<Exercise[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        setLoading(true);
        const [similarExercisesData, videosData] = await Promise.all([
          fetchSimilarExercises(exercise.target),
          fetchExerciseVideos(exercise.name)
        ]);
        
        // Filter out the current exercise from similar exercises
        const filteredSimilarExercises = similarExercisesData.filter(
          (ex: Exercise) => ex.id !== exercise.id
        ).slice(0, 3);
        
        setSimilarExercises(filteredSimilarExercises);
        setVideos(videosData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching additional data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdditionalData();
  }, [exercise]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          <h2 className="text-xl font-bold capitalize">{exercise.name}</h2>
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
            <div className="flex justify-center">
              <img 
                src={exercise.gifUrl} 
                alt={exercise.name} 
                className="max-h-80 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Exercise Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded mr-4">
                    <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Equipment</p>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{exercise.equipment}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded mr-4">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Target Muscle</p>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{exercise.target}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded mr-4">
                    <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium">Body Part</p>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{exercise.bodyPart}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Perform this exercise with proper form to target the {exercise.target} muscle group. 
                  Use appropriate weight and maintain controlled movements throughout.
                </p>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-8">
              <Loader />
            </div>
          ) : (
            <>
              {/* Videos Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Watch Exercise Videos</h3>
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {videos.map(video => (
                      <a 
                        key={video.id}
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
                            <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="h-6 w-6 text-red-600 ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{video.channelName}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No videos available for this exercise.</p>
                )}
              </div>
              
              {/* Similar Exercises Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Similar Exercises</h3>
                {similarExercises.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarExercises.map(similar => (
                      <div 
                        key={similar.id}
                        className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={similar.gifUrl} 
                          alt={similar.name}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                        <div className="p-3">
                          <h4 className="font-medium capitalize">{similar.name}</h4>
                          <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
                              {similar.bodyPart}
                            </span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium rounded">
                              {similar.target}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No similar exercises available.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;