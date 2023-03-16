import { DataGrid } from '@mui/x-data-grid';
import { Add, Search } from '@mui/icons-material'
import {
    Box,
    InputAdornment,
    TextField,
    Typography,
    Card,
    CardContent,
    Fab,
  } from '@mui/material'

  import Grid2 from '@mui/material/Unstable_Grid2';

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

  const DataGridTable = () => {
    const addRow = () => { console.log("Add exercise") /* Add exercise */ };

    return (
        <div style={{height: 300, width: '75%'}}>
            <DataGrid rows={rows} columns={columns} initialState={{
                columns: {
                    columnVisibilityModel: {
                        id: false,
                    },
                },
            }} />
            <Grid2
                container
                spacing={0}
            >
                <Grid2 xs 
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Fab color='primary'>
                        <Add onClick={addRow}/>
                    </Fab>
                </Grid2>
            </Grid2>
        </div>
    )
  }

export default DataGridTable