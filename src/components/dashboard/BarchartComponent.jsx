import { BarChart } from "@mui/x-charts/BarChart";

// const courseSalesData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const productSalesData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const days = [
//   "10-01-2024",
//   "11-01-2024",
//   "12-01-2024",
//   "13-01-2024",
//   "14-01-2024",
//   "15-01-2024",
//   "16-01-2024",
// ];

export default function BarchartComponent(data) {
  const days = data.data.days;
  const cData = data.data.totalCourseSales;
  const pData = data.data.totalProductSales;
  return (
    <BarChart
      height={350}
      borderRadius={4}
      series={[
        {
          data: cData,
          label: "Course",
          id: "pvId",
        },
        {
          data: pData,
          label: "Product",
          id: "uvId",
        },
      ]}
      xAxis={[{ data: days, scaleType: "band" }]}
    />
  );
}
