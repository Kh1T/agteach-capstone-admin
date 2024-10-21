import { Box, Typography, CircularProgress } from "@mui/material";
import BarchartComponent from "./BarchartComponent";

import { useGetSalesOverviewQuery } from "../../services/api/adminApi";

function Overview() {
  const { data, isLoading } = useGetSalesOverviewQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

    const saleData = (data?.salesData ?? []).reduce(
      (acc, { day, totalCourseSales, totalProductSales }) => {
        const date = new Date(day);
        const formattedDate = [
          String(date.getDate()).padStart(2, "0"),
          String(date.getMonth() + 1).padStart(2, "0"), // Months are zero-indexed
          date.getFullYear(),
        ].join("-");

        acc.days.push(formattedDate);
        acc.totalCourseSales.push(Math.ceil(totalCourseSales / 10) * 10);
        acc.totalProductSales.push(totalProductSales);

        return acc;
      },
      { days: [], totalCourseSales: [], totalProductSales: [] }
    );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 440,
          boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
          borderRadius: 4,
        }}
      >
        <Box sx={{ px: "25px", pt: "35px" }}>
          <Typography variant="blgsm">Overview</Typography>
          <BarchartComponent data={saleData} />
        </Box>
      </Box>
    </>
  );
}

export default Overview;
