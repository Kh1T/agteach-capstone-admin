import React from "react";
import { useGetAllInstructorsQuery } from "../services/instructorApi"; // Adjust the import path accordingly
import { Link } from "react-router-dom";
import { Button, Grid, Grid2, Stack, Typography, Box } from "@mui/material"; // Adjust the imports based on your UI library
import CustomTable from "./../components/CustomTable"; // Adjust the import path accordingly

export default function UserPage() {
  const { isLoading, isSuccess, data } = useGetAllInstructorsQuery();
  console.log(data);

  if (!isLoading) console.log(data.data);

  const instructorList =
    isLoading || !data || !data.data
      ? []
      : data.data.map((item) => ({
          Register: item.createdAt,
          Name: `${item.firstName} ${item.lastName}`,
          Location: item.locationId,
          instructorId: item.instructorId,
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
  console.log({ instructorList });

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
      <Grid2 sx={{ width: "100%" }} xs={12} py={5}>
        <Grid2 item gap={3}>
          <Typography variant="h4">Instructor Review</Typography>
          <CustomTable data={instructorList} />
        </Grid2>
      </Grid2>
    </Grid>
  );
}

