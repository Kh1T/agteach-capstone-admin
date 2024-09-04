import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * A table component that displays the given data.
 *
 * @param {array} data - An array of objects where each object is a row in the table.
 * @param {number} [rowLimit=5] - The number of rows can be only 5, 10, 25 base on MUI Table
 * @param {boolean} [isPagination=false] - If true, a pagination component is displayed.
 * @returns {ReactElement} A table component with optional pagination.
 */
export default function TableComponent({
  data,
  rowLimit = 5,
  isPagination = false,
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
            minWidth: 650,
            borderTop: '1px dashed',
            borderBottom: '1px dashed',
            borderColor: 'grey.300',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              {headers.map((title, id) => (
                <TableCell key={id}>
                  <Typography variant="bssm">{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, id) => (
              <TableRow key={id}>
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      borderBottom: '1px dashed',
                      borderColor: 'grey.300',
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
