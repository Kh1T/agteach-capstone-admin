import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


/**
 * CustomSelect component
 * @description A component that renders a select dropdown with a list of items
 * @param {string} id - The id of the select element
 * @param {string} label - The label of the select element
 * @param {array} useSelectState - The state to store the selected value
 * @param {array} selectData - The array of select data eg: ["Newest", "Oldest", "World"]
 * @returns {ReactElement} CustomSelect component
 */
export default function CustomSelect({ id, label, useSelectState, selectData, ...sx }) {
  const [selectState, setSelectState] = useSelectState;

  return (
    <Box sx={{ minWidth: 180, ...sx}}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          id={id}
          value={selectState}
          onChange={(e) => setSelectState(e.target.value)}
          label="Transaction"
          defaultValue="10"
        >
          {selectData.map((item, id) => (
            <MenuItem value={id * 10} key={id}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
