import {
  Typography,
  Box,
  Checkbox,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LoginCover from '../assets/ag-login-cover.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { CustomAlert } from '../components/CustomAlert';

/**
 * LoginPage component
 * @description A component that renders a login form with input field for email and password.
 * Also renders a checkbox for remember me and a log in button.
 * The component also renders a snackbar at the bottom of the screen if the login is incorrect.
 * @returns {ReactElement} A React component representing a login form.
 */
function LoginPage() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  /**
   * Handles the form submission.
   * If the password is incorrect, sets the error message
   * for both the email and password fields.
   * @param {object} data - The form data.
   */
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== '123456') {
      setOpen(true);
      setError(
        'email',
        { type: 'manual', message: 'Invalid email or password' },
        { shouldFocus: true }
      );
      setError(
        'password',
        { type: 'manual', message: 'Invalid email or password' },
        { shouldFocus: true }
      );
      return;
    }
  };

  return (
    <Stack alignItems="center" textAlign="center" height="100vh">
      <Box width="100%">
        <Box
          component="img"
          src={LoginCover}
          height={350}
          width="100%"
          sx={{
            objectFit: 'cover',
          }}
        />
      </Box>

      <Stack pt={15} px={3} gap={2}>
        <Typography variant="h1">Welcome back Admin</Typography>
        <Typography variant="bmdr" color="dark.300">
          Let's see an amazing progress
        </Typography>
        <Stack gap component="form" onSubmit={handleSubmit(onSubmit)}>
          <CustomAlert
            label={errors.email?.message}
            open={open}
            onClose={() => setOpen(false)}
          />
          <TextField
            variant="outlined"
            label="Email"
            error={!!errors.email}
            helperText={errors.email && 'Email is required'}
            {...register('email', { required: true })}
          />
          <TextField
            variant="outlined"
            label="Password"
            type={visible ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password && 'Password is required'}
            {...register('password', { required: true })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {/* Toggle password visibility */}
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack direction="row" alignItems="center">
            <Checkbox {...register('rememberMe')} />
            <Typography variant="body1" color="initial">
              Keep me logged in
            </Typography>
          </Stack>
          <Button type="submit" size="large" variant="contained">
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
