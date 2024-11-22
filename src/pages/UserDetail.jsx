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
  const nationalId = "123456789012345";
  const bankNumber = "9876543210987654321";
  const targetProduct = "Develop innovative web-based education tools.";
  const targetCourse = `Course Objectives: Students will learn to design, implement, and optimize web applications using JavaScript frameworks. The course will cover essential topics such as component architecture, state management, routing, and API integration.
Learning Outcomes: By the end of the course, students will be able to:
Develop scalable and maintainable applications using popular JavaScript frameworks (e.g., React, Angular, Vue).
Implement best practices for performance optimization and code quality.
Create user-friendly interfaces that enhance the learning experience.
Target Audience: This course is ideal for aspiring web developers, educators looking to integrate technology into their teaching methods, and professionals seeking to upgrade their skills in modern web development.
Teaching Methodology: The course will employ a mix of theoretical lessons and hands-on projects. Students will engage in interactive coding sessions, collaborative group work, and real-world case studies to solidify their understanding.
Assessment: Participants will be evaluated through practical assignments, quizzes, and a final project that showcases their ability to apply what they have learned in a real-world context.`;
  const profileBackground =
    "John is a seasoned web developer with over a decade of experience. He specializes in JavaScript frameworks and is dedicated to creating impactful learning experiences for his students.";
  const instructorDetailContent = (
    <Card sx={{ margin: "20px auto", padding: 3, boxShadow: 3 }}>
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
              Objective Project:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {targetCourse}
            </Typography>
          </Grid>

          {/* Objective Course */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Objective Course:
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
              {targetCourse}
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
        <CustomChip label="Approved" sx={{ py: 2, px: 3 }} />
      </Stack>
      <Divider sx={{ borderStyle: "dashed", width: "100%" }} />
      <Stack width="100%" gap={2}>
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
            Approve
          </Button>
        </Stack>
        <CustomTable data={instructor} isPagination={false} />
      </Stack>
    </Stack>
  );
}
