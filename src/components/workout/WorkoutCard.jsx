import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteWorkout } from '../../services/auth/workout-service';
import { useState } from 'react';

function WorkoutCard({ workout, onClick, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    try {
      await deleteWorkout(workout.id);
      if (onDeleted) onDeleted();
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      onClick={() => onClick && onClick(workout.id)}
      sx={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">{workout.note}</Typography>
        <Typography>Workout Date: {new Date(workout.date).toLocaleDateString()}</Typography>
        <Typography>Exercises: {workout.exerciseCount}</Typography>
        <Typography>Total Calories Burned: {workout.totalCaloriesBurned}</Typography>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={handleDelete}
            sx={{ color: 'red', position: 'absolute', bottom: 0, right: 0 }}
            disabled={deleting}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
