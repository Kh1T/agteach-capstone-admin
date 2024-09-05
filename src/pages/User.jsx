import { Button, Grid, Stack, Typography } from '@mui/material';
import CustomTable from '../components/CustomTable';
import { CustomChip } from '../components/CustomChip';
import { Link } from 'react-router-dom';

export default function UserPage() {
  const instructorList = instructors.map((item) => ({
    ...item,
    status: item.status ? (
      <CustomChip label="Approved" />
    ) : (
      <CustomChip label="Not Approved" danger />
    ),
    review: (
      <Link to={`/user/${item.id}`}>
        <Button
          variant="contained"
          sx={{ color: 'white', bgcolor: 'blue.main' }}
        >
          View
        </Button>
      </Link>
    ),
  }));
  return (
    <Grid container>
      <Grid container gap={2}>
        <Grid
          color="white"
          borderRadius={3}
          bgcolor="blue.main"
          height={300}
          item
          xs
        >
          <Stack alignItems="center" height="100%" justifyContent="center">
            <Typography fontSize={100} fontWeight="bold">
              50
            </Typography>
            <Typography>Number of Instructor</Typography>
          </Stack>
        </Grid>
        <Grid color="white" borderRadius={3} bgcolor="primary.main" item xs>
          <Stack alignItems="center" height="100%" justifyContent="center">
            <Typography fontSize={100} fontWeight="bold">
              50
            </Typography>
            <Typography>Number of Guest</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} py={5}>
        <Stack gap={3}>
          <Typography variant="h4">Instructor Review</Typography>
          <CustomTable data={instructorList} />
        </Stack>
      </Grid>
    </Grid>
  );
}

const instructors = [
  {
    id: 1,
    register: '2022-01-01',
    name: 'chandara',
    phone: '0123456789',
    location: 'St.6, plov veng sreng',
    status: true,
  },
  {
    id: 2,
    register: '2022-01-01',
    name: 'chandara',
    phone: '0123456789',
    location: 'St.6, plov veng sreng',
    status: false,
  },
  {
    id: 3,

    name: 'sokhengchhean',
    register: '2022-01-01',
    phone: '0123456789',
    location: 'St.6, plov veng sreng',
    status: true,
  },
  {
    id: 4,
    name: 'sokhachum',
    register: '2022-01-01',
    phone: '0123456789',
    location: 'St.6, plov veng sreng',
    status: false,
  },
];
