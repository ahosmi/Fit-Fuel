import { Exercise, BodyPart, Equipment, TargetMuscle } from '../types/exercise';

const EXERCISEDB_API_KEY = import.meta.env.VITE_EXERCISEDB_API_KEY;
const BASE_URL = 'https://exercisedb.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': EXERCISEDB_API_KEY,
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await fetch(`${BASE_URL}/exercises`, { headers });
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

export const fetchBodyParts = async (): Promise<BodyPart[]> => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/bodyPartList`, { headers });
    if (!response.ok) throw new Error('Failed to fetch body parts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching body parts:', error);
    return [];
  }
};

export const fetchEquipment = async (): Promise<Equipment[]> => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/equipmentList`, { headers });
    if (!response.ok) throw new Error('Failed to fetch equipment');
    return await response.json();
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return [];
  }
};

export const fetchTargetMuscles = async (): Promise<TargetMuscle[]> => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/targetList`, { headers });
    if (!response.ok) throw new Error('Failed to fetch target muscles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching target muscles:', error);
    return [];
  }
};

export const fetchSimilarExercises = async (targetMuscle: string): Promise<Exercise[]> => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/target/${targetMuscle}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch similar exercises');
    return await response.json();
  } catch (error) {
    console.error('Error fetching similar exercises:', error);
    return [];
  }
};

export const fetchExerciseVideos = async (exerciseName: string): Promise<any[]> => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName} exercise&type=video&maxResults=3&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch exercise videos');
    const data = await response.json();
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.medium.url
    }));
  } catch (error) {
    console.error('Error fetching exercise videos:', error);
    return [];
  }
};