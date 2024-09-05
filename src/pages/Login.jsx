import {
  Grid2 as Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
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

function LoginPage() {
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          <TextField
            variant="outlined"
            label="Email"
            register={register}
            errors={errors}
          />
          <TextField
            variant="outlined"
            label="Password"
            type={visible ? 'text' : 'password'}
            register={register}
            errors={errors}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
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

          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Keep me logged in"
          />
          <Button type="submit" size="large" variant="contained">
            Login
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
