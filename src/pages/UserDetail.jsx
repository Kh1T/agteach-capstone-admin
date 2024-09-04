import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function UserDetailPage() {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <Stack alignItems="start" gap={5}>
      <Link>
        <Button variant="Text" startIcon={<ChevronLeft />}>
          <Typography variant="bsr" sx={{ textDecoration: 'underline' }}>
            Go Back
          </Typography>
        </Button>
      </Link>
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
        <TableContainer sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      
    </Stack>
  );
}
