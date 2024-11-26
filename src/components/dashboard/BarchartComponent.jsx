import { BarChart } from "@mui/x-charts/BarChart";

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
