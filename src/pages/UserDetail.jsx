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
import { useNavigate, useParams } from "react-router";
import { CustomChip } from "../components/CustomChip";
import BabyMommy from "../assets/baby-mummy.png";
import {
  useGetInstructorDetailQuery,
  useUpdateVerifyInstructorMutation,
} from "../services/api/instructorApi";
import { CustomAlert } from "../components/CustomAlert";
import { useState } from "react";

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
  const [isApprovedSubmitted, setIsApprovedSubmitted] = useState(null);
  const [open, setOpen] = useState(null);
  const [messesage, setMessesage] = useState(null);

  const { data, isLoading } = useGetInstructorDetailQuery(userId);
  const [updateVerifyInstructor] = useUpdateVerifyInstructorMutation();

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

  const handleApproved = async () => {
    const res = await updateVerifyInstructor({ id: userId, isApproved: true });
    setMessesage(res.data?.message);
    setOpen(true);
    setIsApprovedSubmitted(true);
  };
  const handleRejected = async () => {
    const res = await updateVerifyInstructor({ id: userId, isRejected: true });
    setMessesage(res.data?.message);
    setOpen(true);
  };

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    nationalId,
    bankNumber,
    targetCourse,
    targetProduct,
    profileBackground,
    isApproved,
    imageUrl,
    isRejected,
  } = data?.instructor || {};

  const instructorDetailContent = (
    <Card sx={{ width: "100%", margin: "20px auto", padding: 3, boxShadow: 3 }}>
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
      <CustomAlert
        label={messesage}
        open={open}
        onClose={() => setOpen(false)}
        severity={isApprovedSubmitted ? "success" : "error"}
      />
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
            src={imageUrl || BabyMommy}
            component="img"
            width={130}
            height={130}
          />
          <Stack gap>
            <Typography variant="bxsr">Instructor Name</Typography>
            <Typography variant="blgr">
              {firstName || "Unknown"} {lastName}{" "}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>
              {email || "Unknown"}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>
              {phone || "Unknown"}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>
              {address || "Not Provided"}
            </Typography>
          </Stack>
        </Stack>
        {!isApproved && !isRejected && (
          <CustomChip
            label="Not Yet Approve"
            danger="true"
            sx={{ py: 2, px: 3 }}
          />
        )}
        {isApproved && <CustomChip label="Approved" sx={{ py: 2, px: 3 }} />}
        {isRejected && (
          <CustomChip label="Rejected" danger={true} sx={{ py: 2, px: 3 }} />
        )}
      </Stack>
      <Divider sx={{ borderStyle: "dashed", width: "100%" }} />
      <Stack width="100%" gap={2} pb={6}>
        <Typography variant="blgsm">User Detail</Typography>
        {instructorDetailContent}
        {!isApproved && !isRejected && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleApproved}
              sx={{ color: "white", bgcolor: "blue.main" }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              onClick={handleRejected}
              sx={{ color: "white", bgcolor: "red.main" }}
            >
              Reject
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
