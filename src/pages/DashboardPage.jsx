import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { deleteToken } from '../lib/token-storage';
import WeeklyCaloriesBurned from '../components/analytics/WeeklyCaloriesBurned';
import WeightMeasurements from '../components/analytics/WeightMeasurements';
import AverageWeeklyFrequency from '../components/analytics/AverageWeeklyFrequency';
import AverageWeeklyDuration from '../components/analytics/AverageWeeklyDuration';

function DashboardPage() {
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
  const [openGoalDialog, setOpenGoalDialog] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    deleteToken();
    navigate('/login');
  };

  const handleWorkoutOpen = (workoutId = null) => {
    setSelectedWorkoutId(workoutId);
    setOpenWorkoutDialog(true);
  };
  const handleWorkoutClose = () => {
    setOpenWorkoutDialog(false);
    setSelectedWorkoutId(null);
  };
  const handleWorkoutSubmit = (message) => {
    toast.success(message || 'Workout added successfully!');
    setOpenWorkoutDialog(false);
    setSelectedWorkoutId(null);
    dispatch(fetchWorkouts());
  };

  const handleGoalOpen = (type) => {
    setDialogType(type);
    setOpenGoalDialog(true);
  };
  const handleGoalClose = () => {
    setOpenGoalDialog(false);
  };
  const handleGoalSubmit = (type) => {
    const message = type === 'goal' ? 'Goal added successfully!' : 'Weight added successfuly!';
    toast.success(message);
    setOpenGoalDialog(false);
    dispatch(fetchGoals());
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <Button variant="outlined" color="action" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <AddWorkoutDialog
        open={openWorkoutDialog}
        onClose={handleWorkoutClose}
        onSuccess={handleWorkoutSubmit}
        workoutId={selectedWorkoutId}
      />
      <AddGoalDialog
        open={openGoalDialog}
        onClose={handleGoalClose}
        onSuccess={handleGoalSubmit}
        type={dialogType}
      />

      <div style={{ display: 'flex' }}>
        <WeeklyCaloriesBurned />
        <WeightMeasurements />
        <AverageWeeklyFrequency />
        <AverageWeeklyDuration />
      </div>

      <Typography variant="h4" sx={{ mb: 2 }}>
        Goals
      </Typography>
      <GoalList />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleGoalOpen('goal')}
        style={{ marginTop: 16 }}
      >
        Add Goal
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleGoalOpen('weight')}
        style={{ marginTop: 16 }}
      >
        Add Weight
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
