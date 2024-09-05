import {
  Grid2 as Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      sx={{
        justifyContent: { xs: 'center', md: 'center', lg: 'start' },
        mx: { xs: 2, md: 0, lg: 0 },
      }}
      mt={{ xs: 50, md: 50, lg: 0 }}
      spacing={10}
    >
      <Grid sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
        {/* <SideBarImg /> */}
      </Grid>
      <Grid>
        <Stack>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            gap="20px"
          >
            <Typography variant="h1">Welcome back Instructor</Typography>
            <Typography color="dark.300">
              Please login to continue to your account.
            </Typography>
          </Box>
          <Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* <InputField
                fieldName="Email"
                register={register}
                errors={errors}
              />
              <InputField
                fieldName="Password"
                fieldType="password"
                register={register}
                errors={errors}
              /> */}

              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Keep me logged in"
              />
              <Link to="forgot">Forgot Password ?</Link>
              {/* <CustomButton color="primary" variant="contained">
                Login
              </CustomButton> */}
              <Typography>
                Need an account ? <Link to="/signup">Create one</Link>
              </Typography>
            </form>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
