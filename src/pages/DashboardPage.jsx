import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddWorkoutDialog from '../components/workout/AddWorkoutDialog';
import { toast } from 'react-toastify';

function DashboardPage() {
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);

  const handleWorkoutOpen = () => setOpenWorkoutDialog(true);
  const handleWorkoutClose = () => setOpenWorkoutDialog(false);
  const handleWorkoutSubmit = () => {
    toast.success('Workout added successfully!');
    setOpenWorkoutDialog(false);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleWorkoutOpen}
        style={{ marginTop: 16 }}
      >
        Add Workout
      </Button>
      <AddWorkoutDialog
        open={openWorkoutDialog}
        onClose={handleWorkoutClose}
        onSuccess={handleWorkoutSubmit}
      />
    </div>
  );
}

export default DashboardPage;
