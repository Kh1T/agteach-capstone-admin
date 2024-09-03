import { BarChart } from "@mui/x-charts/BarChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "10-01-2024",
  "11-01-2024",
  "12-01-2024",
  "13-01-2024",
  "14-01-2024",
  "15-01-2024",
  "16-01-2024"
];

export default function BarchartComponent() {
  return (
    <BarChart
      //   width='{100%}',
      height={350}
      series={[
          { data: pData, label: "Course", id: "pvId" },
          { data: uData, label: "Product", id: "uvId" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        sx={{
          // maxWidth: 800,
          width: "100%",
        }}
    />
  );
}
