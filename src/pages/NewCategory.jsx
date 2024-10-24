import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../services/categoryApi";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ChevronLeft } from "@mui/icons-material";

export default function NewCategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?.categoryId;

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { isLoading, isSubmitting, isSubmitSuccessful, errors },
  } = useForm();
  console.log(isSubmitting);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [nameCharCount, setNameCharCount] = useState(0);
  const [descCharCount, setDescCharCount] = useState(0);

  const name = watch("name");
  const description = watch("description");
  useEffect(() => {
    setNameCharCount(name?.length);
    setDescCharCount(description?.length);
  }, [name, description]);

  const maxNameLength = 50;
  const maxDescLength = 500;

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
  }, [editMode, category, setValue]);

  const ButtonText = editMode ? "UPDATE CATEGORY" : "CREATE CATEGORY";
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          py: 3,
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
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap={3}>
          <ContentText
            title="What is the category name for the product?"
            text="Your category name should be short and meaningful"
          />
          <TextField
            label={
              nameCharCount === 0
                ? "Category Name"
                : `Category Name : ${nameCharCount} / ${maxNameLength}`
            }
            accept="text/plain"
            {...register("name", {
              required: "Category name is required",
              maxLength: {
                value: maxNameLength,
                message: `Category name should be less than ${maxNameLength} characters`,
              },
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
            label={
              descCharCount === 0
                ? "Description"
                : `Description : ${descCharCount} / ${maxDescLength}`
            }
            accept="text/plain"
            placeholder="Tell us more about your category"
            rows={5}
            {...register("description", {
              required: "Category description is required",
              maxLength: {
                value: maxNameLength,
                message: `Category description should be less than ${maxDescLength} characters`,
              },
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
            sx={{
              mt: 1,
              bgcolor: "blue.main",
              size: "large",
              maxWidth: "200px",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : ButtonText}
          </Button>
          {isSubmitSuccessful && navigate("/category")}
        </Stack>
      </form>
    </>
  );
}

function ContentText({ title, text }) {
  return (
    <Stack gap={1}>
      <Typography variant="blgsm">{title}</Typography>
      <Typography variant="bxsr">{text}</Typography>
    </Stack>
  );
}
