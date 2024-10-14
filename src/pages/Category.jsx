import { Stack } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import { useRef, useState } from "react";
import CustomTable from "../components/CustomTable";
import { Box, CircularProgress, Link, Button } from "@mui/material";
import { useGetAllCategoriesQuery } from "../services/categoryApi";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CategoryPage() {
  const [selectState, setSelectState] = useState(0);
  const searchRef = useRef();
  const label = "Sort";
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  console.log(data);
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
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        edit: (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/product/new", {
                state: {
                  product: item,
                  editMode: true,
                  productId: item.productId,
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
    </Stack>
  );
}
