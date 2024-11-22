import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import CustomTable from "../components/CustomTable";
import { useNavigate, useParams } from "react-router";
import { CustomChip } from "../components/CustomChip";
import { useGetInstructorDetailQuery } from "../services/api/instructorApi";

/**
 * UserDetailPage Component
 *
 * Renders detailed information about an instructor, including name, email,
 * phone number, address, and account timestamps. It fetches data using the
 * user ID from the URL and displays a loading spinner while retrieving data.
 *
 * @component
 * @example
 * // Usage example:
 * <UserDetailPage />
 *
 * @returns {JSX.Element} The rendered UserDetailPage component.
 */
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
  console.log(data, "data");
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
  const { nationalId, bankNumber, targetCourse, targetProduct, profileBackground } =
    data?.instructor;

  const instructorDetailContent = (
    <Card sx={{ width:"100%", margin: "20px auto", padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Instructor Information
        </Typography>

        <Grid container spacing={2}>
          {/* National ID */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              National ID:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {nationalId}
            </Typography>
          </Grid>

          {/* Bank Number */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Bank Number:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {bankNumber}
            </Typography>
          </Grid>

          {/* Objective Project (Target Product) */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Product Objective:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {targetProduct}
            </Typography>
          </Grid>

          {/* Objective Course */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Course Objective:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {targetCourse}
            </Typography>
          </Grid>

          {/* Profile Background */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Profile Background:
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 1.6 }}
            >
              {profileBackground}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
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
        <CustomChip label="Not Yet Approve" danger="true" sx={{ py: 2, px: 3 }} />
      </Stack>
      <Divider sx={{ borderStyle: "dashed", width: "100%" }} />
      <Stack width="100%" gap={2} pb={6}>
        <Typography variant="blgsm">User Detail</Typography>
        {instructorDetailContent}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ color: "white", bgcolor: "blue.main" }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white", bgcolor: "red.main" }}
          >
            Reject
          </Button>
        </Stack>
        {/* <CustomTable data={instructor} isPagination={false} /> */}
      </Stack>
    </Stack>
  );
}
