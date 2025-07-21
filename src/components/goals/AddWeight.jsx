import { Button, Container, TextField } from '@mui/material';
import { addWeight } from '../../services/goals/goals-service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddWeight({ onFormSubmit }) {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(dayjs());
  const type = 'weight';

  async function handleSubmit(e, dialogCallbacks) {
    e.preventDefault();
    const payload = { weight, date };

    await addWeight(payload);
    if (dialogCallbacks && dialogCallbacks.onSuccess) {
      dialogCallbacks.onSuccess(type);
    } else if (onFormSubmit) {
      onFormSubmit(type);
    } else {
      navigate('/');
    }
  }

  return (
    <Container maxWidth='sm' className='py-10'>
      <form className='flex flex-col gap-4' onSubmit={(e) => onFormSubmit(e, handleSubmit)}>
        <TextField
          label='Weight'
          type='number'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label='Date' value={date} onChange={(e) => setDate(e)} />
        </LocalizationProvider>

        <Button variant='contained' color='secondary' type='submit'>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default AddWeight;
