import { Box } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import { useRef, useState } from "react";
import TableComponent from "../components/TableComponent";
import { data } from "../data/sampleDashboardData";
export default function CategoryPage() {
  const [selectState, setSelectState] = useState(0);
  const searchRef = useRef();
  const label = "Sort";

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
  return (
    <Box width={"100%"}>
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest"]}
        handleSearch={handleSearch}
        pathCreated="/category/new"
        labelCreate="Create Category"
      />
      <TableComponent data={data} />
    </Box>
  );
}
