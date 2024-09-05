import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
    setError,
    formState: { errors },
  } = useForm();

  const currentPassword = watch('currentPassword');

  /**
   * Resets the form by calling useForm's reset method.
   *
   * @function
   */
  const resetForm = () => {
    reset();
  };

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
  const onSubmit = (data) => {
    console.log(data);
    if (data.newPassword !== data.retypeNewPassword) {
      handleClick();
      setError('newPassword', { type: 'focus' }, { shouldFocus: true });
      setError('retypeNewPassword', { type: 'focus' }, { shouldFocus: true });
      return;
    }

    resetForm();
  };

  /**
   * Handles the click event of the snackbar.
   *
   * @function
   */
  const handleClick = () => {
    setOpen(true);
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Box>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Stack gap={4}>
      {/* A snackbar that shows up when the password does not match */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Password does not matched"
        action={action}
      />
      <Stack gap={2}>
        <Typography variant="h4">Personal information</Typography>
        <Typography variant="subtitle1">User Name: JackMa</Typography>
      </Stack>
      <Stack gap={2}>
        <Typography variant="h4">Account Security</Typography>
        <Typography variant="bmdr">User Email: jackma@xyz.com</Typography>
      </Stack>
      <Divider />
      {/* A form to change password */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            helperText={errors.currentPassword?.message}
            error={!!errors.currentPassword}
            {...register('currentPassword', { required: 'This is required.' })}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            helperText={errors.newPassword?.message}
            error={!!errors.newPassword}
            {...register('newPassword', { required: 'This is required.' })}
          />
          <TextField
            id="outlined-basic"
            label="Re-type new Password"
            variant="outlined"
            helperText={errors.retypeNewPassword?.message}
            error={!!errors.retypeNewPassword}
            {...register('retypeNewPassword', {
              required: 'This is required.',
            })}
          />
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button
              disabled={!currentPassword}
              type="submit"
              variant="contained"
            >
              Save Change
            </Button>
            <Button onClick={resetForm} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
