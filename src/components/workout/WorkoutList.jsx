import React, { useEffect, useState } from 'react';
import { getWorkoutsList } from '../../services/auth/workout-service';
import { Grid, CircularProgress } from '@mui/material';
import WorkoutCard from './WorkoutCard';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchWorkoutList() {
      const data = await getWorkoutsList();
      setWorkouts(data.data.workouts);
      setLoading(false);
    }
    fetchWorkoutList();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {workouts.map((workout) => (
        <Grid size={{ xs: 12, md: 3 }} key={workout.id}>
          <WorkoutCard workout={workout} />
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutList;
