import { Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { addExercises, getExercises, updateExercises } from '../../services/auth/workout-service';
import ExerciseTable from './ExerciseTable';
import { useNavigate } from 'react-router-dom';

function AddWorkout({ inDialog = false, onFormSubmit, workout }) {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [date, setDate] = useState(dayjs());
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
    const formattedData = {
      date: dayjs(date).toISOString(),
      note,
      exercises: exerciseRows.map((row) => ({
        exercise: getExerciseIdByDisplay(row.exercise),
        sets: Number(row.sets) || 0,
        reps: Number(row.reps) || 0,
        weight: Number(row.weight) || 0,
        caloriesBurned: Number(row.caloriesBurned) || 0,
      })),
    };
    try {
      if (workout) {
        await updateExercises(workout._id, formattedData);
      } else {
        await addExercises(formattedData);
      }
      if (inDialog && dialogCallbacks && dialogCallbacks.onSuccess) {
        dialogCallbacks.onSuccess();
      } else if (onFormSubmit) {
        onFormSubmit();
      } else {
        navigate('/');
      }
    } catch {
      if (inDialog && dialogCallbacks && dialogCallbacks.onError) {
        dialogCallbacks.onError();
      }
    }
  }

  return (
    <Container maxWidth="md" className="py-10">
      <form
        className="flex flex-col gap-4"
        onSubmit={inDialog ? (e) => onFormSubmit(e, handleSubmit) : handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Workout Date" value={date} onChange={(e) => setDate(e)} />
        </LocalizationProvider>
        <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />

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
