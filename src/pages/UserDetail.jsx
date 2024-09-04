import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import CustomTable from '../components/CustomTable';
import { useNavigate } from 'react-router';

export default function UserDetailPage() {
  const navigate = useNavigate();
  const instructorList = instructors.map((item) => ({
    ...item,
    password: (
      <Button color="error" variant="outlined">
        Reset
      </Button>
    ),
  }));
  return (
    <Stack alignItems="start" gap={5}>
      <Button
        onClick={() => navigate(-1)}
        variant="Text"
        startIcon={<ChevronLeft />}
      >
        <Typography variant="bsr" sx={{ textDecoration: 'underline' }}>
          Go Back
        </Typography>
      </Button>

      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={3}>
          <Box
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkxGINkXzKO1VE-jS8ED8i08kpb_2pC9lR0A&s"
            component="img"
            width={130}
            height={130}
          />
          <Stack gap>
            <Typography variant="bxsr">Instructor Name</Typography>
            <Typography variant="blgr">Chan Dara</Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>dara@abc.xyz
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>0123456789
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>St.6, plov veng sreng
            </Typography>
          </Stack>
        </Stack>
        <Typography>hi</Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
      <Stack width="100%" gap={2}>
        <Typography variant="blgsm">User Detail</Typography>
        <CustomTable data={instructorList} />
      </Stack>
    </Stack>
  );
}

const instructors = [
  {
    id: 1,
    firstName: 'Chan',
    lastName: 'Dara',
    username: 'chandara',
    email: 'dara@abc.xyz',
    phone: '0123456789',
    address: 'St.6, plov veng sreng',
    createdAt: '2022-01-01T00:00:00.000Z',
    lastLogin: '2022-01-01T00:00:00.000Z',
  },
];
