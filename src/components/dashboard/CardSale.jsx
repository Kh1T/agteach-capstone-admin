import { Box, Stack, Typography } from "@mui/material";

function CardSale() {
  return (
    <>
      <Box
        sx={{
          // p:4,
          width: "100%",
          height: 215,
          borderRadius: 1,
          bgcolor: "grey.100",
          // "&:hover": {
          //   bgcolor: "primary.dark",
          // },
          boxShadow: 1,
        }}
      >
        <Stack direction="column" spacing={5} sx={{mx:"30px", mt: "30px"}}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Typography variant="bmdsm" sx={{ color: "dark.300" }}>
              Sale
            </Typography>
            <Typography variant="bsr" sx={{ color: "dark.200" }}>
              Monthly
            </Typography>
          </Stack>
          <Typography variant="blgsm" sx={{ color: "dark.400" }}>
            $230,220
          </Typography>
          <Typography variant="bsr" sx={{ color: "dark.200" }}>
            +55% since last month
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default CardSale;
