import {
  Button,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../services/categoryApi";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { ChevronLeft } from "@mui/icons-material";

export default function NewCategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?.categoryId;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isLoading, isSubmitSuccessful, errors },
  } = useForm();
  const [createCategory] = useCreateCategoryMutation();
  const { data: categoryData } = useGetCategoryQuery(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();

  const submitHandler = async (data) => {
    try {
      if (!editMode) {
        await createCategory(data);
      } else {
        await updateCategory({ data: data, id: categoryId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Edit mode
  const category = location.state?.category;
  const editMode = location.state?.editMode;

  useEffect(() => {
    if (editMode && category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [editMode, category]);

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          py:3,
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          variant="Text"
          startIcon={<ChevronLeft />}
        >
          <Typography variant="bsr" sx={{ textDecoration: "underline" }}>
            Go Back
          </Typography>
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(submitHandler)} >
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
          <FormHelperText sx={{ color: "red.main" }}>
            {errors.name?.message}
          </FormHelperText>
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
            {...register("description", {
              required: "Category description is required",
            })}
            error={errors.description}
          />
          <FormHelperText sx={{ color: "red.main" }}>
            {errors.description?.message}
          </FormHelperText>
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
            {editMode ? "UPDATE CATEGORY" : "CREATE CATEGORY"}
          </Button>
          {isSubmitSuccessful && navigate("/category")}
        </Stack>
      </form>
    </>
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
