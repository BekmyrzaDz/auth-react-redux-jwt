import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "_id", headerName: "ID", width: 230 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    type: "text",
    width: 330,
  },
];

const Table = ({ rows }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Table;
