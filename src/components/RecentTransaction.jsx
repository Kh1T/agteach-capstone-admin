import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { useState } from "react";
import CustomTableHeader from "./CustomTableHeader";
import CustomSelect from "./CustomSelect";
import TableComponent from "./TableComponent";

/**
 * RecentTransaction component
 * @description A component that displays a table of recent transactions with a select dropdown to filter by course or product
 * @returns {ReactElement} A JSX element representing the RecentTransaction component
 */
function RecentTransaction() {
  function createData(...rest) {
    return { ...rest };
  }
  const headers = ["No", "Name", "Date", "Amount"];
  const rows = [
    createData(1, "Sok", "1-1-2024", "10$"),
    createData(2, "Sok", "1-1-2024", "10$"),
    createData(3, "Sok", "1-1-2024", "10$"),
    createData(4, "Sok", "1-1-2024", "10$"),
    createData(5, "Sok", "1-1-2024", "10$"),
  ];
  const data = { headers, rows };
  const [transaction, setTransaction] = useState();
  return (
    <Paper
      sx={{
        height: "440px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          pt: "30px",
          pb: "15px",
          px: "20px",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CustomTableHeader
          title="Recent Transaction"
          content="Found(5) Items"
        />
        <CustomSelect
          label="Transaction"
          useSelectState={[transaction, setTransaction]}
          selectData={["Course", "Product"]}
        />
      </Stack>
      <TableComponent data={data} />{" "}
    </Paper>
  );
}

export default RecentTransaction;
