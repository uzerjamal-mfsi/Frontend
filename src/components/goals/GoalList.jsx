import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from '../../state/goals-slice';
import { Box, CircularProgress, Typography } from '@mui/material';
import GoalCard from './GoalCard';

function GoalList() {
  const dispatch = useDispatch();
  const { goals, loading } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return <Box>{goals.length ? goals.map((goal) => <GoalCard goal={{ goal }} />) : null}</Box>;
}

export default GoalList;
