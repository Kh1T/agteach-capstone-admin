import React, { useState } from "react";
import { useGetAllInstructorsQuery, useGetInstructorsCountQuery } from "../services/api/instructorApi"; 
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid2,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material"; // Adjust the imports based on your UI library
import CustomTable from "./../components/CustomTable";
import { useGetAllCustomerQuery } from "../services/api/adminApi";
import { CustomChip } from "../components/CustomChip";
import CustomSelect from "../components/CustomSelect";
/**
 * A page that displays the total number of instructors and customers,
 * and also provides a table of instructors that have been reviewed.
 *
 * @returns {ReactElement} A React component that renders the UserPage.
 */
export default function UserPage() {
  const { data: customerData } = useGetAllCustomerQuery();
  const [selectState, setSelectState] = useState(0); // 0 for All, 10 for Approved, 20 for Rejected 
  const selectData = ["All", "Approved", "Rejected"]; 
  const label = "Filter By";
  const { isLoading, data } = useGetAllInstructorsQuery(selectState); 
  // Get Length of instructor
  const { isLoading: isInstructorLoading, data: instructorData } = useGetInstructorsCountQuery(); 

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
          Status: (
            <CustomChip
              label={
                item.isApproved
                  ? "Approved"
                  : item.isRejected
                  ? "Rejected"
                  : "Not Approve"
              }
              danger={item.isApproved ? false : true}
            />
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

  // const handleOnChange = (event) => {};
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
              {isInstructorLoading && 'Loading'}
              {!isInstructorLoading && instructorData?.data?.length}
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
        <Stack spacing={4}>
          <Typography variant="h4">Instructor Review</Typography>
          <CustomSelect
            label={label}
            useSelectState={[selectState, setSelectState]}
            selectData={selectData}
            width="400px"
          />
          <CustomTable data={instructorList || []} />
        </Stack>
      </Grid2>
    </Box>
  );
}
