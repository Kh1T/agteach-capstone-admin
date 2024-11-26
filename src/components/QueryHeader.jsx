import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CustomSelect from "./CustomSelect";
import ButtonComponent from "./ButtonComponent";
import { useEffect } from "react";

/**
 * QueryHeader component
 * @description A component that displays a search bar and create new button
 * @param {object} props
 * @param {React.RefObject<HTMLInputElement>} [props.searchRef=null] - Reference to the search text input
 * @param {function} props.useSelectState - state to store selected value ex: [state, setState]
 * @param {array} props.selectData - array of select data eg: ["Newest", "Oldest"]
 * @param {function} props.handleCreateNew - function to handle create new button
 * @param {function} props.handleSearch - function to handle search button
 * @param {string} [props.labelCreate="Create New"] - label for create new button
 * @param {string} [props.placeholder="Search"] - placeholder for search input
 * @returns {ReactElement} QueryHeader component
 */
export default function QueryHeader({
  useSelectState,
  handleSearch,
  searchRef = null,
  selectData = ["Newest", "Oldest"],
  pathCreated = "/",
  labelCreate = "Create New",
  placeholder = "Search",
  isCreateNew = true,
  selectLabel = "Sort",
}) {
  useEffect(() => {
    handleSearch();
  });
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };
  const content = (
    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          placeholder={placeholder}
          inputRef={searchRef}
          sx={{ width: 300 }}
          onKeyDown={handleKeyDown}  
        />
        <CustomSelect
          label={selectLabel}
          useSelectState={useSelectState}
          selectData={selectData}
        />
        <Button
          variant="outlined"
          sx={{
            textTransform: "uppercase",
            color: "purple.main",
            borderColor: "purple.main",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>
      {isCreateNew && (
        <ButtonComponent
          variant="contained"
          sx={{
            backgroundColor: "purple.main",
            textTransform: "uppercase",
            height: "100%",
          }}
          // handleCreateNew={handleCreateNew}
          path={pathCreated}
        >
          {labelCreate}
          <AddIcon sx={{ ml: 1 }} />
        </ButtonComponent>
      )}  
    </Stack>
  );
  return content;
}
