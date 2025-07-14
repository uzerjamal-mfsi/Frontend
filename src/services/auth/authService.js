import API_ROUTES from "../../constants/apiRoutes";
import axiosInstance from "../../lib/axios";

export const register = (data) =>
  axiosInstance.post(API_ROUTES.AUTH.REGISTER, data);

export const login = (data) => axiosInstance.post(API_ROUTES.AUTH.LOGIN, data);
