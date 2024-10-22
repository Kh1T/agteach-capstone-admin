import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Stack,
} from "@mui/material";
import CustomTableHeader from "../CustomTableHeader";
import { useState } from "react";
import CustomTable from "../CustomTable";
import { useGetProductTopSalesQuery } from "../../services/productApi";
import { useGetCourseTopSalesQuery } from "../../services/courseApi";

function TopPerformance() {
  const [transaction, setTransaction] = useState(10); // 10 for Product, 20 for Course

  // Fetch both datasets
  const { data: productData, isLoading: isLoadingProducts } =
    useGetProductTopSalesQuery();

  const { data: courseData, isLoading: isLoadingCourses } =
    useGetCourseTopSalesQuery();
  // Transform product data
  const productSalesData =
    !isLoadingProducts && productData?.salesProductTotals
      ? productData.salesProductTotals.map((item, index) => ({
          "No": index + 1,
          "Product Name": item.name,
          "Category": item.category,
          "Earning": `${item.totalSales}$`,
        }))
      : [];

  // Transform course data
  const courseSalesData =
    !isLoadingCourses && courseData?.salesCourseTotals
      ? courseData.salesCourseTotals.map((item, index) => ({
          "No": index + 1,
          "Product Name": item.name,
          "Category": "Course",
          "Earning": `${item.totalSales}$`,
        }))
      : [];

  const isLoading = isLoadingProducts;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
        borderRadius: 4,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <CustomTableHeader
            title="Top(5) Performance"
            content="In this month"
          />
          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="transaction-select-label">Transaction</InputLabel>
              <Select
                labelId="transaction-select-label"
                id="transaction-select"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                label="Transaction"
              >
                <MenuItem value={20}>Course</MenuItem>
                <MenuItem value={10}>Product</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <CustomTable
          data={transaction === 10 ? productSalesData : courseSalesData}
          isPagination={false}
        />
      </Stack>
    </Box>
  );
}

export default TopPerformance;
