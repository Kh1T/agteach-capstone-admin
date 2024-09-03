import {  Button, Divider, Stack, TextField, Typography } from "@mui/material";

export default function NewCategoryPage() {
  return (
    <Stack gap={3}>
      <ContentText
        title="What is the category name for the product?"
        text="Your category name should be short and meaningful"
      />
      <TextField label="Title" />
      <ContentText
        title="Tell us more about your category"
        text="Help explain what does the category contain"
      />
      <TextField
        id="outlined-multiline-static"
        multiline
        label="Description"
        placeholder="Tell us more about your category"
        rows={5}
      />
      <Divider sx={{borderStyle:'dashed'}}/>
      <Button variant="contained" size="large" sx={{ width:"200px", backgroundColor: "purple.main" }}>
        CREATE CATEGORY
      </Button>
    </Stack>
  );
}

function ContentText({ title, text }) {
  return (
    <Stack gap>
      <Typography variant="blgsm">{title}</Typography>
      <Typography variant="bxsr">{title}</Typography>
    </Stack>
  );
}
