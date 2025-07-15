import axiosInstance from '../../lib/axios';
import { API_ROUTES } from '../../constants/api-routes';

export const getExercises = () => axiosInstance.get(API_ROUTES.WORKOUTS.GET_EXERCISES);
export const addExercises = (data) => axiosInstance.post(API_ROUTES.WORKOUTS.ADD_WORKOUT, data);

export const getWorkoutsList = (page = 1, limit = 10) =>
  axiosInstance.get(`${API_ROUTES.WORKOUTS.GET_WORKOUTS_LIST}?page=${page}&limit=${limit}`);
