import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from '../state/workouts-slice';

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
  },
});
