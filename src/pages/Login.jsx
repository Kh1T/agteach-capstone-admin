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
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "../feature/slice/authSlice.js";
import { useLoginMutation } from "../services/api/authApi";
import { useSelector } from "react-redux";
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
  const dispatch = useDispatch();
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
    try {
      const response = await login(data).unwrap(); // login mutation call
      dispatch(checkLoginStatus(true));
      navigator("/");
    } catch (error) {
      console.error("Incorrect email or password", error);
      setOpen(true);
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
    <Stack alignItems="center" textAlign="center">
      <Box width="100%">
        <Box
          component="img"
          src={LoginCover}
          width="100%"
          sx={{
            height: { xs: 300, md: 350 },
            objectFit: "cover",
          }}
        />
      </Box>

      <Stack p={15} px={3} gap={3}>
        <Box>
          <Typography variant="h1">Welcome back Admin</Typography>
          <Typography variant="bmdr" color="dark.300">
            Let's see an amazing progress
          </Typography>
        </Box>
        <Stack
          spacing={3}
          component="form"
          onSubmit={handleSubmit(submitHandler)}
        >
          <CustomAlert
            label={errors.email?.message}
            open={open}
            onClose={() => setOpen(false)}
          />
          <TextField
            variant="outlined"
            label="Email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
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
