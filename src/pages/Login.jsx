import {
  Typography,
  Box,
  Checkbox,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoginCover from "../assets/ag-login-cover.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { CustomAlert } from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi.js";

/**
 * LoginPage component
 * @description A component for the login page
 * @returns {ReactElement} A React component representing the LoginPage
 */
function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const response = await login(data).unwrap(); // login mutation call
      console.log("Login successful", response);
      navigator("/"); // Redirect to home page
    } catch (error) {
      console.error("Incorrect email or password", error);
      setOpen(true);  // Open the CustomAlert for errors
      setError(
        "email",
        { type: "manual", message: "Incorrect email or password" },
        { shouldFocus: true }
      );
      setError(
        "password",
        { type: "manual", message: "Incorrect email or password" },
        { shouldFocus: true }
      );
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
            objectFit: "cover",
          }}
        />
      </Box>

      <Stack pt={15} px={3} gap={2}>
        <Typography variant="h1">Welcome back Admin</Typography>
        <Typography variant="bmdr" color="dark.300">
          Let's see an amazing progress
        </Typography>
        <Stack gap component="form" onSubmit={handleSubmit(submitHandler)}>
          <CustomAlert
            label={errors.email?.message}
            open={open}
            onClose={() => setOpen(false)}
          />
          <TextField
            variant="outlined"
            label="Email"
            error={!!errors.email}
            helperText={errors.email && "Email is required"}
            {...register("email", { required: true })}
          />
          <TextField
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password && "Password is required"}
            {...register("password", { required: true })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" alignItems="center">
            <Checkbox {...register("rememberMe")} />
            <Typography variant="bmdr" color="initial">
              Keep me logged in
            </Typography>
          </Stack>
          <Button type="submit" size="large" variant="contained">
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}


export default LoginPage;
