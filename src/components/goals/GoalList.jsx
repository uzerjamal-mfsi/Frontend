import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from '../../state/goals-slice';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import GoalCard from './GoalCard';

function GoalList() {
  const dispatch = useDispatch();
  const { goals, loading } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {goals.map((goal) => (
        <Grid key={goal.id} size={{ xs: 12, md: 6 }}>
          <GoalCard goal={{ goal }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default GoalList;
