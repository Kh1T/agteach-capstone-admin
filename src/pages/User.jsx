import React from "react";
import { useGetAllInstructorsQuery } from "../services/instructorApi"; // Adjust the import path accordingly
import { Link } from "react-router-dom";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material"; // Adjust the imports based on your UI library
import CustomTable from "./../components/CustomTable"; // Adjust the import path accordingly

export default function UserPage() {
  const { isLoading, data } = useGetAllInstructorsQuery();
  console.log(data);

  if (!isLoading) console.log(data.data);

  const instructorList =
    isLoading || !data || !data.data
      ? []
      : data.data.map((item) => ({
          Register: item.createdAt,
          Name: `${item.firstName} ${item.lastName}`,
          Location: item.location.name,
          review: (
            <Link to={`/user/${item.instructorId}`}>
              <Button
                variant="contained"
                sx={{ color: "white", bgcolor: "blue.main" }}
              >
                View
              </Button>
            </Link>
          ),
        }));
  return (
    <Box >
      <Grid2 container gap={2}>
        <Grid2
          fullWidth
          color="white"
          borderRadius={3}
          bgcolor="blue.main"
          height={300}
          container
          xs
        >
          <Stack alignItems="center" height="100%" justifyContent="center">
            <Typography fontSize={100} fontWeight="bold">
              50
            </Typography>
            <Typography>Number of Instructor</Typography>
          </Stack>
        </Grid2>
        <Grid2 color="white" borderRadius={3} bgcolor="primary.main" item xs>
          <Stack alignItems="center" height="100%" justifyContent="center">
            <Typography fontSize={100} fontWeight="bold">
              50
            </Typography>
            <Typography>Number of Guest</Typography>
          </Stack>
        </Grid2>
      </Grid2>
      
      {/* Custom Table */}
      <Grid2 sx={{ width: "100%" }} xs={12} py={5}>
        <Grid2 item gap={3}>
          <Typography variant="h4">Instructor Review</Typography>
          <CustomTable data={instructorList} />
        </Grid2>
      </Grid2>
    </Box>
  );
}

