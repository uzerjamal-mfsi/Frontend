import axiosInstance from '../../lib/axios';
import { API_ROUTES } from '../../constants/api-routes';

export const getWeeklyCalories = () => axiosInstance.get(API_ROUTES.ANALYTICS.WEEKLY_CALORIES);
export const getWeeklyDuration = () => axiosInstance.get(API_ROUTES.ANALYTICS.WEEKLY_DURATION);
export const getWeeklyFrequency = () => axiosInstance.get(API_ROUTES.ANALYTICS.WEEKLY_FREQUENCY);
export const getWeightMeasurements = () =>
  axiosInstance.get(API_ROUTES.ANALYTICS.WEIGHT_MEASUREMENT);
