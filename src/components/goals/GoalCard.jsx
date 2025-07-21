import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function GoalCard({ goal }) {
  const { type, target, progress, note } = goal.goal;
  const achieved = goal.goal.achived || progress >= target;
  const label = type === 'workout_per_week' ? 'Workouts this week' : 'Current Weight';

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader title={label} />
      <CardContent>
        <Typography variant='h6'>{note}</Typography>
        <Typography variant='h6'>
          Target: {progress} / {target}
        </Typography>
        <Typography>Status: {achieved ? 'Achieved' : 'In Progress'}</Typography>
      </CardContent>
    </Card>
  );
}

export default GoalCard;
