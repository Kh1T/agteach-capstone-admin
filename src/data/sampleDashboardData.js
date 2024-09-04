function createData(...rest) {
  return { ...rest };
}
let headers = ["No", "Name", "Date", "Amount"];
let rows = [
  createData(1, "Sok", "1-1-2024", "10$"),
  createData(2, "Sok", "1-1-2024", "10$"),
  createData(3, "Sok", "1-1-2024", "10$"),
  createData(4, "Sok", "1-1-2024", "10$"),
  createData(5, "Sok", "1-1-2024", "10$"),
];

export const data = { headers, rows };
