import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddWorkout from './AddWorkout';
import { getWorkoutById } from '../../services/workout/workout-service';

function AddWorkoutDialog({ open, onClose, onSuccess, workoutId }) {
  const [submitting, setSubmitting] = useState(false);
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    async function fetchWorkoutData() {
      if (workoutId) {
        const data = await getWorkoutById(workoutId);
        setWorkoutData(data.data.workout);
      } else {
        setWorkoutData(null);
      }
    }
    fetchWorkoutData();
  }, [workoutId]);

  async function handleFormSubmit(e, formSubmit) {
    setSubmitting(true);
    await formSubmit(e, {
      onSuccess: () => {
        setSubmitting(false);
        onSuccess && onSuccess();
        onClose && onClose();
      },
      onError: () => setSubmitting(false),
    });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{workoutId ? 'Edit' : 'Add'} Workout</DialogTitle>
      <DialogContent>
        <AddWorkout onFormSubmit={handleFormSubmit} workout={workoutData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddWorkoutDialog;
