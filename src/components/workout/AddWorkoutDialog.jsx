import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddWorkout from './AddWorkout';

function AddWorkoutDialog({ open, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e, formSubmit) => {
    setSubmitting(true);
    await formSubmit(e, {
      onSuccess: () => {
        setSubmitting(false);
        onSuccess && onSuccess();
        onClose && onClose();
      },
      onError: () => setSubmitting(false),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Workout</DialogTitle>
      <DialogContent>
        <AddWorkout inDialog onFormSubmit={handleFormSubmit} />
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
