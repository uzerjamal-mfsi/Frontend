import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import WorkoutCard from './WorkoutCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../../state/workouts-slice';

function WorkoutList({ onCardClick }) {
  const dispatch = useDispatch();
  const { workouts, loading } = useSelector((state) => state.workouts);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {workouts.map((workout) => (
        <Grid size={{ xs: 12 }} key={workout.id}>
          <WorkoutCard workout={workout} onClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutList;
