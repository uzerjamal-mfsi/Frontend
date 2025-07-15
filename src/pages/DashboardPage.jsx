import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddWorkoutDialog from '../components/workout/AddWorkoutDialog';
import { toast } from 'react-toastify';
import WorkoutList from '../components/workout/WorkoutList';

function DashboardPage() {
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleWorkoutOpen = (workoutId = null) => {
    setSelectedWorkoutId(workoutId);
    setOpenWorkoutDialog(true);
  };
  const handleWorkoutClose = () => {
    setOpenWorkoutDialog(false);
    setSelectedWorkoutId(null);
  };
  const handleWorkoutSubmit = () => {
    toast.success('Workout added successfully!');
    setOpenWorkoutDialog(false);
    setSelectedWorkoutId(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleWorkoutOpen(null)}
        style={{ marginTop: 16 }}
      >
        Add Workout
      </Button>
      <AddWorkoutDialog
        open={openWorkoutDialog}
        onClose={handleWorkoutClose}
        onSuccess={handleWorkoutSubmit}
        workoutId={selectedWorkoutId}
      />
      <WorkoutList onCardClick={handleWorkoutOpen} refreshKey={refreshKey} />
    </div>
  );
}

export default DashboardPage;
