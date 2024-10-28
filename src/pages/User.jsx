import React from "react";
import { useGetAllInstructorsQuery } from "../services/instructorApi"; // Adjust the import path accordingly
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid2,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material"; // Adjust the imports based on your UI library
import CustomTable from "./../components/CustomTable"; // Adjust the import path accordingly
import { useGetAllCustomerQuery } from "../services/api/adminApi";
export default function UserPage() {
  const { isLoading, data } = useGetAllInstructorsQuery();
  const { data: customerData } = useGetAllCustomerQuery();
  const customerList =
    isLoading || !customerData
      ? []
      : customerData.data.map((item) => ({
          Register: new Date(item.createdAt).toLocaleDateString(),
        }));
  const instructorList =
    isLoading || !data
      ? []
      : data.data.map((item) => ({
          Register: new Date(item.createdAt).toLocaleDateString(),
          Name: `${item.firstName} ${item.lastName} ` || "Unknown",
          Phone: item.phone || "Unknown",
          Location: item.location ? item.location.name : "Unknown",
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

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Grid2 container sx={{ width: "100%", justifyContent: "space-between" }}>
        <Grid2
          bgcolor="blue.main"
          sx={{ width: "49.5%" }}
          color="white"
          borderRadius={3}
          height={300}
          item
          xs
        >
          <Stack alignItems="center" height="100%" justifyContent="center">
            <Typography fontSize={100} fontWeight="bold">
              {instructorList.length || 0}
            </Typography>
            <Typography>Number of Instructor</Typography>
          </Stack>
        </Grid2>
        <Grid2
          bgcolor="primary.main"
          sx={{ width: "49.5%" }}
          color="white"
          borderRadius={3}
          height={300}
          item
          xs
        >
          <Stack alignItems="center" height="100%" justifyContent="center">
            <Typography fontSize={100} fontWeight="bold">
              {customerList.length || 0}
            </Typography>
            <Typography>Number of Guest</Typography>
          </Stack>
        </Grid2>
      </Grid2>

      {/* Custom Table */}
      <Grid2 sx={{ width: "100%" }} xs={12} py={5}>
        <Grid2 item gap={3}>
          <Typography variant="h4">Instructor Review</Typography>
          <CustomTable data={instructorList || []} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
