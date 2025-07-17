import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import AddGoal from './AddGoal';
import AddWeight from './AddWeight';

function AddGoalDialog({ open, onClose, onSuccess, type }) {
  const [submitting, setSubmitting] = useState(false);

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{type === 'goal' ? 'Add Goal' : 'Add Weight'}</DialogTitle>
      <DialogContent>
        {type === 'goal' ? (
          <AddGoal onFormSubmit={handleFormSubmit} />
        ) : (
          <AddWeight onFormSubmit={handleFormSubmit} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddGoalDialog;
