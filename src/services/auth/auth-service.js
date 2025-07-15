import axiosInstance from '../../lib/axios';
import { API_ROUTES } from '../../constants/api-routes';

export const register = (data) => axiosInstance.post(API_ROUTES.AUTH.REGISTER, data);

export const login = (data) => axiosInstance.post(API_ROUTES.AUTH.LOGIN, data);
