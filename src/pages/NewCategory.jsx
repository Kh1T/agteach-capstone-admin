import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateCategoryMutation } from "../services/categoryApi";
import { useNavigate } from "react-router";

export default function NewCategoryPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isLoading, isSubmitSuccessful, errors },
  } = useForm();
  const [createCategory] = useCreateCategoryMutation();

  const submitHandler = async (data) => {
    console.log(data);
    if (data) {
      await createCategory(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack gap={3}>
        <ContentText
          title="What is the category name for the product?"
          text="Your category name should be short and meaningful"
        />
        <TextField
          label="Title"
          accept="text/plain"
          {...register("name", {
            required: "Category name is required",
          })}
          error={errors.name}
          />
          <FormHelperText>{errors.name?.message}</FormHelperText>
        <ContentText
          title="Tell us more about your category"
          text="Help explain what does the category contain"
        />
        <TextField
          id="outlined-multiline-static"
          multiline
          label="Description"
          accept="text/plain"
          placeholder="Tell us more about your category"
          rows={5}
          {...register("description", { required: "Category description is required" })}
          error={errors.description}
        />
        <FormHelperText>{errors.description?.message}</FormHelperText>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            width: "200px",
            bgcolor: isSubmitSuccessful ? "teal" : "purple.main",
          }}
          bgcolor={isSubmitSuccessful ? "teal" : "purple.main"}
        >
          CREATE CATEGORY
        </Button>
        {isSubmitSuccessful && navigate("/category")}
      </Stack>
    </form>
  );
}

function ContentText({ title, text }) {
  return (
    <form gap>
      <Typography variant="blgsm">{title}</Typography>
      <Typography variant="bxsr">{title}</Typography>
    </form>
  );
}
