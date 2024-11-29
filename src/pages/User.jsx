import React, { useRef, useState } from "react";
import {
  useGetAllInstructorsQuery,
} from "../services/api/instructorApi";
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
import QueryHeader from "../components/QueryHeader";
/**
 * A page that displays the total number of instructors and customers,
 * and also provides a table of instructors that have been reviewed.
 *
 * @returns {ReactElement} A React component that renders the UserPage.
 */
export default function UserPage() {
  const { data: customerData } = useGetAllCustomerQuery();
  const [selectState, setSelectState] = useState(0); // 0 for All, 10 for Not Yet Approve, 20 for Approved, 30 for Rejected
  const selectData = ["All", "Not Yet Approve", "Approved", "Rejected"];
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef();
  const label = "Filter By";
  const { isLoading, data } = useGetAllInstructorsQuery({email: searchTerm, filter: selectState});

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
          Email: item.email,
          Name: item.firstName ? `${item.firstName} ${item.lastName} ` : "Unknown",
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
                  : "Not Yet Approve"
              }
              danger={item.isApproved ? false : true}
            />
          ),
        }));

  const handleSearch = () => {
    setSearchTerm(searchRef.current.value || "");
  };

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
              {isLoading && "Loading"}
              {!isLoading && data.numInstructor}
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
          <QueryHeader
            useSelectState={[selectState, setSelectState]}
            handleSearch={handleSearch}
            searchRef={searchRef}
            selectData={selectData}
            isCreateNew={false}
            placeholder="Email"
            selectLabel={label}
          />
          <CustomTable data={instructorList || []} />
        </Stack>
      </Grid2>
    </Box>
  );
}
