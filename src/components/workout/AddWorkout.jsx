import { Button, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {
  addExercises,
  getExercises,
  updateExercises,
} from '../../services/workout/workout-service.js';
import ExerciseTable from './ExerciseTable';
import { useNavigate } from 'react-router-dom';

function AddWorkout({ onFormSubmit, workout }) {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [date, setDate] = useState(dayjs());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [exerciseRows, setExerciseRows] = useState([
    { exercise: null, sets: 0, reps: 0, caloriesBurned: 0 },
  ]);

  const exerciseRowTextFields = [
    { label: 'Sets', field: 'sets' },
    { label: 'Reps', field: 'reps' },
    { label: 'Weight', field: 'weight' },
    { label: 'Calories Burned', field: 'caloriesBurned' },
  ];

  useEffect(() => {
    async function fetchExercises() {
      try {
        const exerciseData = await getExercises();
        setExercises(exerciseData.data.exercises);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    }
    fetchExercises();
  }, []);

  useEffect(() => {
    if (workout) {
      setNote(workout.note || '');
      setDate(dayjs(workout.date));
      const durationMs = workout.duration || 0;
      setHours(Math.floor(durationMs / (60 * 60 * 1000)));
      setMinutes(Math.floor((durationMs % (60 * 60 * 1000)) / (60 * 1000)));
      setExerciseRows(
        workout.exercises.map((ex) => ({
          exercise: `${ex.exercise.name} (${ex.exercise.muscleGroup})`,
          sets: ex.sets || 0,
          reps: ex.reps || 0,
          weight: ex.weight || 0,
          caloriesBurned: ex.caloriesBurned || 0,
        })),
      );
    }
  }, [workout]);

  function addRow() {
    setExerciseRows([...exerciseRows, { exercise: null, sets: 0, reps: 0, caloriesBurned: 0 }]);
  }

  function updateCol(index, field, value) {
    setExerciseRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][field] = value;
      return updatedRows;
    });
  }

  function deleteRow(index) {
    setExerciseRows((prevRows) => prevRows.filter((_, rowIndex) => rowIndex !== index));
  }

  function getExerciseIdByDisplay(display) {
    const match = exercises.find((ex) => `${ex.name} (${ex.muscleGroup})` === display);
    return match ? match._id : display;
  }

  async function handleSubmit(e, dialogCallbacks) {
    e.preventDefault();
    const duration = (Number(hours) || 0) * 60 * 60 * 1000 + (Number(minutes) || 0) * 60 * 1000;
    const formattedData = {
      date: dayjs(date).toISOString(),
      note,
      duration,
      exercises: exerciseRows.map((row) => ({
        exercise: getExerciseIdByDisplay(row.exercise),
        sets: Number(row.sets) || 0,
        reps: Number(row.reps) || 0,
        weight: Number(row.weight) || 0,
        caloriesBurned: Number(row.caloriesBurned) || 0,
      })),
    };
    try {
      let response;
      if (workout) {
        response = await updateExercises(workout._id, formattedData);
      } else {
        response = await addExercises(formattedData);
      }
      let message = '';
      if (response && response.data.goal) {
        const { achieved, progress, target } = response.data.goal;
        if (achieved) {
          message = 'Congratulations you have completed your workout per week goal!';
        } else if (target && progress / target >= 0.75) {
          message = `You are so close to finishing your goal of ${target}!`;
        } else {
          message = 'Workout added sucessfully!';
        }
      }
      if (dialogCallbacks && dialogCallbacks.onSuccess) {
        dialogCallbacks.onSuccess(message);
      } else if (onFormSubmit) {
        onFormSubmit(message);
      } else {
        navigate('/');
      }
    } catch {
      if (dialogCallbacks && dialogCallbacks.onError) {
        dialogCallbacks.onError();
      }
    }
  }

  return (
    <Container maxWidth="md" className="py-10">
      <form className="flex flex-col gap-4" onSubmit={(e) => onFormSubmit(e, handleSubmit)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Workout Date" value={date} onChange={(e) => setDate(e)} />
        </LocalizationProvider>
        <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <TextField
            label="Hours"
            type="number"
            value={hours}
            slotProps={{ input: { min: 0 } }}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 0) {
                setHours(value);
              }
            }}
            style={{ maxWidth: 120 }}
          />

          <TextField
            label="Minutes"
            type="number"
            value={minutes}
            slotProps={{ input: { min: 0, max: 59 } }}
            onChange={(e) => {
              const value = e.target.value;
              const num = Number(value);
              if (value === '' || (num >= 0 && num <= 59)) {
                setMinutes(value);
              }
            }}
            style={{ maxWidth: 120 }}
          />
        </div>

        <ExerciseTable
          exerciseRows={exerciseRows}
          exercises={exercises}
          exerciseRowTextFields={exerciseRowTextFields}
          updateCol={updateCol}
          deleteRow={deleteRow}
        />

        <Button variant="contained" color="secondary" onClick={addRow}>
          Add Exercise
        </Button>

        <Button variant="contained" color="primary" type="submit">
          Submit Workout
        </Button>
      </form>
    </Container>
  );
}

export default AddWorkout;
