import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import CustomTable from "../components/CustomTable";
import { replace, useNavigate, useParams } from "react-router";
import { CustomChip } from "../components/CustomChip";
import { useGetInstructorDetailQuery } from "../services/instructorApi";

export default function UserDetailPage() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const { data, isLoading } = useGetInstructorDetailQuery(userId);

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

  const instructor = isLoading
    ? {}
    : [
        {
          "First Name": data.instructor.firstName,
          "Last Name": data.instructor.lastName,
          email: data.instructor.email,
          "Last Update": new Date(data.instructor.updatedAt)
            .toLocaleString()
            .replace(/\//g, "-"),
          "Created Account": new Date(data.instructor.createdAt)
            .toLocaleString()
            .replace(/\//g, "-"),
        },
      ];
  return (
    <Stack alignItems="start" gap={5}>
      <Button
        onClick={() => navigate(-1)}
        variant="Text"
        startIcon={<ChevronLeft />}
      >
        <Typography variant="bsr" sx={{ textDecoration: "underline" }}>
          Go Back
        </Typography>
      </Button>

      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={3}>
          <Box
            src={data.instructor.imageUrl}
            component="img"
            width={130}
            height={130}
          />
          <Stack gap>
            <Typography variant="bxsr">Instructor Name</Typography>
            <Typography variant="blgr">
              {data.instructor.firstName} {data.instructor.lastName}{" "}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>
              {data.instructor.email}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>
              {data.instructor.phone}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>
              {data.instructor.address || "Not Provided"}
            </Typography>
          </Stack>
        </Stack>
        <CustomChip label="Approved" sx={{ py: 2, px: 3 }} />
      </Stack>
      <Divider sx={{ borderStyle: "dashed", width: "100%" }} />
      <Stack width="100%" gap={2}>
        <Typography variant="blgsm">User Detail</Typography>
        <CustomTable data={instructor} isPagination={false} />
      </Stack>
    </Stack>
  );
}
