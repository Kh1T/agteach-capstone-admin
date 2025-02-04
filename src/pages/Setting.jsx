import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetInfoQuery,
  useUpdatePasswordMutation,
} from "../services/api/adminApi";

import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * SettingPage component
 * @description A page for the user to change their password
 * @returns {ReactElement} A React component representing the SettingPage
 */
export default function SettingPage() {
  const [open, setOpen] = useState(false);
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordCurrent = watch("passwordCurrent");

  /**
   * Resets the form by calling useForm's reset method.
   *
   * @function
   */
  const resetForm = () => {
    reset();
  };

  const [updatePassword, { isLoading, isSuccess, isError }] =
    useUpdatePasswordMutation();
  const { data } = useGetInfoQuery();
  let adminInfo = {};
  if (data) {
    adminInfo = data.data;
  }

  /**
   * Handles the form submission.
   *
   * If the new password and the retyped new password do not match, it will
   * show an error message and set the focus to the new password field.
   *
   * Otherwise, it will reset the form.
   *
   * @param {{ newPassword: string; retypeNewPassword: string; }} data - The form data.
   */
  const onSubmit = async (data) => {
    try {
      await updatePassword(data).unwrap();
    } catch (error) {
      setMessage(`Failed to change password: ${error?.data?.message}`);
    }
    resetForm();
  };

  /**
   * Handles the close event of the snackbar.
   *
   * @param {object} event - The event object.
   * @param {string} reason - The reason of the close event.
   *
   * If the reason is 'clickaway', the function simply returns.
   *
   * Otherwise, it sets the open state of the snackbar to false.
   */
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setMessage("Password changed successfully");
      setOpen(true);
    } else if (isError) {
      setOpen(true);
    }
  }, [isSuccess, isError]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Close the Snackbar
  };

  // Separate states for each password visibility toggle
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handlers for toggling password visibility
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <Typography variant="h4">Personal information</Typography>
        <Typography variant="subtitle1">
          User Name: {adminInfo.username || "N/A"}
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Typography variant="h4">Account Security</Typography>
        <Typography variant="bmdr">
          User Email: {adminInfo.email || "N/A"}
        </Typography>
      </Stack>
      <Divider />
      {/* A form to change password */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {(isSuccess || isError) && (
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={message}
            sx={{
              "& .MuiSnackbarContent-root": {
                color: isSuccess
                  ? "success.contrastText"
                  : "error.contrastText", // Dynamic text color
                backgroundColor: isSuccess ? "success.main" : "error.main", // Dynamic background color
              },
            }}
          />
        )}

        <Stack gap={2}>
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            {...register("passwordCurrent", { required: "This is required." })}
            helperText={errors.passwordCurrent?.message}
            error={!!errors.passwordCurrent}
            type={showCurrentPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="newPassword"
            label="New Password"
            variant="outlined"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              validate: (value) =>
                value !== watch("passwordCurrent") ||
                "New Password cannot be the same as current password",
            })}
            type={showNewPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="passwordConfirm"
            label="Re-type new Password"
            variant="outlined"
            {...register("passwordConfirm", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
            helperText={errors.passwordConfirm?.message}
            error={!!errors.passwordConfirm}
            type={showConfirmPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button
              disabled={!passwordCurrent}
              type="submit"
              variant="contained"
              sx={{ textTransform: "uppercase "}}
            >
              {isLoading ? "Loading..." : "Save Changes"}
            </Button>
            <Button onClick={resetForm} variant="outlined" sx={{ textTransform: "uppercase "}}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
