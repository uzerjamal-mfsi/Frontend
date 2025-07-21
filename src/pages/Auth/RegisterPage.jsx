import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../services/auth/auth-service';
import * as yup from 'yup';
import { validate as genericValidate } from '../../utils/validate';

const schema = yup.object().shape({
  name: yup.string().min(3, 'Name must be atleast 3 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = async (fieldValues = { name, email, password }) => {
    return await genericValidate(schema, fieldValues, setErrors);
  };

  const handleFieldChange = async (field, value) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    await validate({
      name: field === 'name' ? value : name,
      email: field === 'email' ? value : email,
      password: field === 'password' ? value : password,
    });
  };

  const isSubmitDisabled = !name || !email || !password || Object.keys(errors).length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;
    try {
      await register({ name, email, password });
      toast.success('Registration successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container maxWidth='sm' className='py-10'>
      <Typography variant='h4' component='h1'>
        Register
      </Typography>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} noValidate>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label='Email'
          value={email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => handleFieldChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button type='submit' variant='contained' color='primary' disabled={isSubmitDisabled}>
          Register
        </Button>
        <Button variant='text' color='secondary' to='/login' component={Link}>
          Already have an account? Login
        </Button>
      </form>
    </Container>
  );
}

export default RegisterPage;
