import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWorkoutsList } from '../services/auth/workout-service';

const initialState = {
  workouts: [],
  loading: false,
};

export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
  const response = await getWorkoutsList();
  return response.data.workouts;
});

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWorkouts.fulfilled, (state, actions) => {
      state.loading = false;
      state.workouts = actions.payload;
    });
  },
});

export default workoutsSlice.reducer;
