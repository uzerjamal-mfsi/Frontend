import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goalsList } from '../services/goals/goals-service';

const initialState = {
  goals: [],
  loading: false,
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await goalsList();
  return response.data.goals.goals;
});

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGoals.fulfilled, (state, actions) => {
      state.loading = false;
      state.goals = actions.payload;
    });
  },
});

export default goalsSlice.reducer;
