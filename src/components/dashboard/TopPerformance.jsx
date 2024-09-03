import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CustomTableHeader from "../CustomTableHeader";
import { useState } from "react";
import TableComponent from "../TableComponent";

function TopPerformance() {
  function createData(...rest) {
    return { ...rest };
  }
  const headers = ["No", "Product", "Category", "Earning"];
  const rows = [
    createData(1, "Advanced Vegetable Farming", "Course", "$150"),
    createData(2, "Advanced Vegetable Farming", "Course", "$150"),
    createData(3, "Advanced Vegetable Farming", "Course", "$150"),
    createData(4, "Advanced Vegetable Farming", "Course", "$150"),
    createData(5, "Advanced Vegetable Farming", "Course", "$150"),
  ];

  const [transaction, setTransaction] = useState();
  const data = { headers, rows };
  return (
    <Box
      sx={{
        boxShadow: 2,
        p: 4,
      }}
    >
      <Stack spacing={0.5}>
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
              <InputLabel id="demo-simple-select">Transaction</InputLabel>
              <Select
                id="demo-simple-select"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                label="Transaction"
                defaultValue="10"
              >
                <MenuItem value={10}>Course</MenuItem>
                <MenuItem value={20}>Product</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <TableComponent data={data} />
      </Stack>
    </Box>
  );
}

export default TopPerformance;
