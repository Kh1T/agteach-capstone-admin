import { Box,  Typography } from "@mui/material";
import SimpleBarChart from "./SimpleBarChart";

function Overview() {
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
          <SimpleBarChart />
        </Box>
      </Box>
    </>
  );
}

export default Overview;
