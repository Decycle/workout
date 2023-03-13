import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows = [
    { id: 1, workout: 'Barbell Squats', col1: 'Hello', col2: 'World' },
    { id: 2, workout: 'Deadlifts', col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, workout: 'Bench Press', col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: "id", hide: true },
    { field: "workout", headerName: 'Exercise Name', width: 150 },
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  const DataGridCalendar = () => {
    return (
        <div style={{height: 300, width: '100%'}}>
          <DataGrid rows={rows} columns={columns} />
        </div>
    )
  }

export default DataGridCalendar