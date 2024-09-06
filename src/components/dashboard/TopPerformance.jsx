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
import CustomTable from "../CustomTable";

function TopPerformance() {
  const data = [{
    no: 1,
    product: "Advanced Vegetable Farming",
    category: "Course",
    earning: "$150"
  },
  {
    no: 2,
    product: "Advanced Vegetable Farming",
    category: "Course",
    earning: "$150"},
  {
    no: 3,
    product: "Advanced Vegetable Farming",
    category: "Course",
    earning: "$150"},
    {
    no: 4,
    product: "Advanced Vegetable Farming",
    category: "Course",
    earning: "$150"},
    {
    no: 5,
    product: "Advanced Vegetable Farming",
    category: "Course",
    earning: "$150"},
]

  const [transaction, setTransaction] = useState();
  return (
    <Box
      sx={{
        p: 4,
        boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
        borderRadius: 4
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
        <CustomTable data={data} />
      </Stack>
    </Box>
  );
}

export default TopPerformance;
