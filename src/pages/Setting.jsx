import { Stack, Typography, Button } from '@mui/material';

export default function SettingPage() {
  return (
    <Stack>
      <Typography variant="h4">Password Modification</Typography>
      <Typography variant="subtitle1">Current Password</Typography>
      <input type="password" />
      <Typography variant="subtitle1">New Password</Typography>
      <input type="password" />
      <Typography variant="subtitle1">Confirm New Password</Typography>
      <input type="password" />
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Save Changes</Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </Stack>
  );
}
