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
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
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

  const charts = [
    { title: 'Calories Burned Weekly', component: <WeeklyCaloriesBurned /> },
    { title: 'Weight Measurements', component: <WeightMeasurements /> },
    { title: 'Avg Weekly Workout Frequency', component: <AverageWeeklyFrequency /> },
    { title: 'Avg Weekly Workout Duration', component: <AverageWeeklyDuration /> },
  ];

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
    <>
      <div className="flex justify-between items-centers p-4 shadow-md">
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

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {charts.map((chart, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader title={chart.title} />
              <CardContent>{chart.component}</CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader title="Goals" />
          <CardContent>
            <GoalList />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleGoalOpen('goal')}
              className="mr-8"
            >
              Add Goal
            </Button>

            <Button variant="contained" color="primary" onClick={() => handleGoalOpen('weight')}>
              Add Weight
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader title="Recent Workouts" />
          <CardContent>
            <WorkoutList onCardClick={handleWorkoutOpen} />
            <Button variant="contained" color="primary" onClick={() => handleWorkoutOpen()}>
              Add Workout
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default DashboardPage;
