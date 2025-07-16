import { useState } from 'react';
import Button from '@mui/material/Button';
import AddWorkoutDialog from '../components/workout/AddWorkoutDialog';
import { toast } from 'react-toastify';
import WorkoutList from '../components/workout/WorkoutList';
import { useDispatch } from 'react-redux';
import { fetchWorkouts } from '../state/workouts-slice';
import GoalList from '../components/goals/GoalList';
import { fetchGoals } from '../state/goals-slice';
import AddGoalDialog from '../components/goals/AddGoalDialog';
import { Typography } from '@mui/material';

function DashboardPage() {
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
  const [openGoalDialog, setOpenGoalDialog] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(fetchWorkouts());
  };

  const handleGoalOpen = () => {
    setOpenGoalDialog(true);
  };
  const handleGoalClose = () => {
    setOpenGoalDialog(false);
  };
  const handleGoalSubmit = () => {
    toast.success('Goal added successfully!');
    setOpenGoalDialog(false);
    dispatch(fetchGoals());
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AddWorkoutDialog
        open={openWorkoutDialog}
        onClose={handleWorkoutClose}
        onSuccess={handleWorkoutSubmit}
        workoutId={selectedWorkoutId}
      />
      <AddGoalDialog open={openGoalDialog} onClose={handleGoalClose} onSuccess={handleGoalSubmit} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Goals
      </Typography>
      <GoalList />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleGoalOpen(null)}
        style={{ marginTop: 16 }}
      >
        Add Goal
      </Button>

      <Typography variant="h4" sx={{ mb: 2 }}>
        Recent Workouts
      </Typography>
      <WorkoutList onCardClick={handleWorkoutOpen} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleWorkoutOpen(null)}
        style={{ marginTop: 16 }}
      >
        Add Workout
      </Button>
    </div>
  );
}

export default DashboardPage;
