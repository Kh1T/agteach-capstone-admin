import { Box, Paper, Stack, Typography } from "@mui/material";
import BarchartComponent from "./BarchartComponent";

function Overview() {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: 440,
          borderRadius: 1,
          // "&:hover": {
          //   bgcolor: "primary.dark",
          // },
          boxShadow: 1,
        }}
      >
        <Box sx={{ px: "20px", pt: "30px" }}>
          <Typography variant="blgmd">Overview</Typography>
          <BarchartComponent />
        </Box>
      </Paper>
    </>
  );
}

export default Overview;
