import axiosInstance from '../../lib/axios';
import { API_ROUTES } from '../../constants/api-routes';

export const goalsList = () => axiosInstance.get(API_ROUTES.GOALS.GOALS_LIST);
export const addGoal = (data) => axiosInstance.post(API_ROUTES.GOALS.ADD_GOAL, data);
