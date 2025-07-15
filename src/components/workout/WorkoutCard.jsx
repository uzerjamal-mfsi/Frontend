import { Card, CardContent, Typography } from '@mui/material';

function WorkoutCard({ workout }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{workout.note}</Typography>
        <Typography>Workout Date: {new Date(workout.date).toLocaleDateString()}</Typography>
        <Typography>Exercises: {workout.exerciseCount}</Typography>
        <Typography>Total Calories Burned: {workout.totalCaloriesBurned}</Typography>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
