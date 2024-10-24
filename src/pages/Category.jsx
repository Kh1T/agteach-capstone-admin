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
  useSearchCategoryQuery,
} from "../services/categoryApi";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteBin from "../assets/delete-bin.png";
import { useEffect } from "react";
export default function CategoryPage() {
  const [selectState, setSelectState] = useState(0);
  const searchRef = useRef();
  const label = "Sort";
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOrder, setSearchOrder] = useState("Newest");
  /**
   * Handles search button click event
   * @function
   * @name handleSearch
   * @param {Event} event - The search button click event
   * @description Logs the search input value and the selected sort option
   */

  const { data, isLoading } = useSearchCategoryQuery({
    name: searchTerm,
    order: searchOrder,
  });

  function handleSearch() {
    setSearchTerm(searchRef.current.value || "");
    setSearchOrder(selectState === 0 ? "Newest" : "Oldest");
  }

  useEffect(() => {
    setSearchTerm(searchRef.current?.value || "");
  }, [searchRef.current?.value]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
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
        Description:
          item.description.length > 40
            ? `${item.description.substring(0, 40)}...`
            : item.description,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
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
            <Box
              component={"img"}
              src={deleteBin}
              alt="Confirmation"
              sx={{ width: "136px", height: "136px", marginBottom: "10px" }}
            ></Box>
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
