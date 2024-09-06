import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * A table component that displays the given data.
 *
 * @param {array} data - An array of objects where each object is a row in the table.
 * @param {number} [rowLimit=5] - The number of rows can be only 5, 10, 25 base on MUI Table
 * @param {boolean} [isPagination=false] - If true, a pagination component is displayed.
 * @returns {ReactElement} A table component with optional pagination.
 */
export default function CustomTable({
export default function CustomTable({
  data,
  rowLimit = 5,
  isPagination = false,
  isLink = false,
  isLink = false,
}) {
  // const tableHead = data.
  let headers = Object.keys(data[0]).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1)
  );
  let rows = data.map((item) => Object.values(item));

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowLimit);

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
            minWidth: 200,
            borderTop: "1px dashed",
            borderBottom: "1px dashed",
            borderColor: "grey.300",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
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
                    component= {isLink ? RouterLink : "div"}
                    to={`${id}`}
                    component= {isLink ? RouterLink : "div"}
                    to={`${id}`}
                    sx={{
                      borderBottom: "1px dashed",
                      borderColor: "grey.300",
                      cursor: isLink ? "pointer" : "default",
                      textDecoration: "none",
                      borderBottom: "1px dashed",
                      borderColor: "grey.300",
                      cursor: isLink ? "pointer" : "default",
                      textDecoration: "none",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
                {/* </Link> */}
                {/* </Link> */}
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
