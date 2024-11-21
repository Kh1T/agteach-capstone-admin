import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Stack, TablePagination, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import frankyIcon from "../assets/spooky-stickers-sweet-franky.svg";

/**
 * A table component that displays the given data.
 *
 * @param {array} data - An array of objects where each object is a row in the table.
 * @param {number} [rowLimit=5] - The number of rows can be only 5, 10, 25 base on MUI Table
 * @param {boolean} [isPagination=false] - If true, a pagination component is displayed.
 * @returns {ReactElement} A table component with optional pagination.
 */
export default function CustomTable({
  data = [],
  rowLimit = 10,
  isPagination = true,
  isLink = false,
}) {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowLimit);
  // const tableHead = data.
  if (!data || data.length === 0)
    return (
      <Stack height={"60vh"} alignItems={"center"} justifyContent={"center"}>
        <Box
          component={"img"}
          src={frankyIcon}
          sx={{ width: "200px", height: "200px" }}
        ></Box>
        <Typography variant="bmdr">No category found</Typography>
      </Stack>
    );
  let headers = Object.keys(data[0]).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1)
  );
  let rows = data.map((item) => Object.values(item));

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  const displayedRows = isPagination
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows;
  const content = (
    <>
      <TableContainer>
        <Table
          sx={{
            minWidth: 200,
            borderTop: "1px dashed",
            borderBottom: "1px dashed",
            borderColor: "grey.300",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              {headers.map((title, id) => (
                <TableCell key={id}>
                  <Typography variant="bssm">{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, id) => (
              <TableRow
                key={id}
                sx={{
                  ":hover": { backgroundColor: "grey.200" },
                }}
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    component={isLink ? RouterLink : "div"}
                    to={`${id}`}
                    sx={{
                      borderBottom: "1px dashed",
                      borderColor: "grey.300",
                      cursor: isLink ? "pointer" : "default",
                      textDecoration: "none",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && (
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </>
  );
  return content;
}
