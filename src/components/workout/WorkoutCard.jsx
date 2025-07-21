import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteWorkout } from '../../services/workout/workout-service';
import { useState } from 'react';

function WorkoutCard({ workout, onClick, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const formatDuration = (ms) => {
    if (!ms || isNaN(ms)) return null;
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

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
      className='cursor-pointer transition-shadow duration-200 hover:shadow-lg'
    >
      <CardContent>
        <Box className='flex items-center justify-between mb-2'>
          <Typography variant='h6'>
            <span className='mr-2'>{workout.note}</span>
          </Typography>
          {workout.duration != null && (
            <Typography color='text.secondary'>
              <span className='mr-2'>{formatDuration(workout.duration)}</span>
            </Typography>
          )}
          <Typography>
            <span className='mr-2'>
              Workout Date: {new Date(workout.date).toLocaleDateString()}
            </span>
          </Typography>
          <Typography>
            <span className='mr-2'>Exercises: {workout.exerciseCount}</span>
          </Typography>
          <Typography>
            <span className='mr-2'>Total Calories Burned: {workout.totalCaloriesBurned}</span>
          </Typography>
          <Box className='flex items-center ml-auto h-full'>
            <IconButton
              aria-label='delete'
              size='small'
              onClick={handleDelete}
              sx={{ color: 'red' }}
              disabled={deleting}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
