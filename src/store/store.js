import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from '../state/workouts-slice';
import goalsReducer from '../state/goals-slice';

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    goals: goalsReducer,
  },
});
