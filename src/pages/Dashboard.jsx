import { Box } from "@mui/material";
import TopPerformance from "../components/dashboard/TopPerformance";
import Grid from "@mui/material/Grid2";
import Overview from "../components/dashboard/Overview";

export default function DashboardPage() {
  const content = (
    <>
      <Box sx={{ flexGrow: 1 }} height={"100vh"}>
        <Grid container>
          <Grid size={12} sx={{ mb: "50px" }}>
            <Overview />
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <TopPerformance />
          </Grid>
        </Grid>
      </Box>
    </>
  );
  return content;
}
