import axiosInstance from '../../lib/axios';
import { API_ROUTES } from '../../constants/api-routes';

export const getExercises = () => axiosInstance.get(API_ROUTES.WORKOUTS.GET_EXERCISES);
export const addExercises = (data) => axiosInstance.post(API_ROUTES.WORKOUTS.ADD_WORKOUT, data);
export const updateExercises = (id, data) =>
  axiosInstance.put(`${API_ROUTES.WORKOUTS.ADD_WORKOUT}${id}`, data);
export const getWorkoutsList = (page = 1, limit = 10) =>
  axiosInstance.get(`${API_ROUTES.WORKOUTS.GET_WORKOUTS_LIST}?page=${page}&limit=${limit}`);
export const getWorkoutById = (id) => axiosInstance.get(`${API_ROUTES.WORKOUTS.GET_WORKOUT}${id}`);
export const deleteWorkout = (id) =>
  axiosInstance.delete(`${API_ROUTES.WORKOUTS.DELETE_WORKOUT}${id}`);
