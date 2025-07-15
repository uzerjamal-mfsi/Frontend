import {
  Autocomplete,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { addExercises, getExercises } from '../../services/auth/workout-service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function AddWorkout({ inDialog = false, onFormSubmit }) {
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
      await addExercises(formattedData);
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

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Calories Burned</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exerciseRows.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Autocomplete
                      options={exercises.map(
                        (exercise) => `${exercise.name} (${exercise.muscleGroup})`,
                      )}
                      size="small"
                      sx={{ minWidth: 250 }}
                      value={row.exercise || ''}
                      onChange={(_, newValue) => updateCol(index, 'exercise', newValue)}
                      renderInput={(params) => <TextField {...params} label="Exercise" />}
                    />
                  </TableCell>
                  {exerciseRowTextFields.map(({ field }) => (
                    <TableCell>
                      <TextField
                        type="number"
                        value={row[field] || ''}
                        size="small"
                        onChange={(e) => updateCol(index, field, e.target.value)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton
                      disabled={exerciseRows.length <= 1}
                      onClick={() => deleteRow(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

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
