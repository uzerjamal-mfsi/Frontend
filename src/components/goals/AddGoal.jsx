import { Button, Container, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { addGoal } from '../../services/goals/goals-service';
import { useNavigate } from 'react-router-dom';

function AddGoal({ onFormSubmit }) {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [target, setTarget] = useState('');
  const [note, setNote] = useState('');

  async function handleSubmit(e, dialogCallbacks) {
    e.preventDefault();
    const payload = {
      type,
      target,
      note,
    };

    await addGoal(payload);

    if (dialogCallbacks && dialogCallbacks.onSuccess) {
      dialogCallbacks.onSuccess();
    } else if (onFormSubmit) {
      onFormSubmit();
    } else {
      navigate('/');
    }
  }

  return (
    <Container maxWidth="sm" className="py-10">
      <form className="flex flex-col gap-4" onSubmit={(e) => onFormSubmit(e, handleSubmit)}>
        <TextField select label="Goal Type" value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="workout_per_week">Workout per Week</MenuItem>
          <MenuItem value="weight_target">Weight Target</MenuItem>
        </TextField>

        <TextField
          label={type == 'workout_per_week' ? 'Target Workouts/Week' : 'Target Weight'}
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />

        <Button variant="contained" color="primary" type="submit">
          Add Goal
        </Button>
      </form>
    </Container>
  );
}

export default AddGoal;
