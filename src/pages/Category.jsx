import { Stack } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import { useRef, useState } from "react";
import CustomTable from "../components/CustomTable";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../services/categoryApi";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteBin from "../assets/delete-bin.png";
export default function CategoryPage() {
  const [selectState, setSelectState] = useState(0);
  const searchRef = useRef();
  const label = "Sort";
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  /**
   * Handles search button click event
   * @function
   * @name handleSearch
   * @param {Event} event - The search button click event
   * @description Logs the search input value and the selected sort option
   */
  function handleSearch() {
    console.log(searchRef.current.value);
    console.log(selectState);
  }

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const { data, isLoading } = useGetAllCategoriesQuery();
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

  const categoryList = isLoading
    ? []
    : data.data.map((item) => ({
        name: item.name,
        createdAt: new Date(item.createdAt).toLocaleString(),
        updatedAt: new Date(item.updatedAt).toLocaleString(),
        edit: (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/category/new`, {
                state: {
                  category: item,
                  editMode: true,
                  categoryId: item.categoryId,
                },
              });
            }}
          />
        ),
        delete: (
          <DeleteIcon
            color="red"
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteClick(item)}
          />
        ),
      }));

  const handleConfirmDelete = async () => {
    await deleteCategory(selectedProduct.categoryId);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Stack gap="30px" width={"100%"}>
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest"]}
        handleSearch={handleSearch}
        pathCreated="/category/new"
        labelCreate="Create Category"
      />
      <CustomTable data={categoryList || []} />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <img
              src={deleteBin}
              alt="Confirmation"
              style={{ width: "136px", height: "136px", marginBottom: "10px" }}
            />
            <Typography variant="blgsm" padding={"10px"}>
              Delete Confirmation
            </Typography>
            <Typography variant="bxsr">
              Are you sure you want to delete this product? <br /> You won't be
              able to retrieve it back.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "16px" }}>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ bgcolor: "red.main", marginRight: 1 }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
