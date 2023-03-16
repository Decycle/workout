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

const rows = [];

const columns = [ 
    {field: 'workout', headerName: 'Workout', width: 200}, 
    {field: 'start', headerName: 'Start time', flex: .5}, 
    {field: 'end', headerName: 'End time', flex: .5}, 
    {field: 'workout_info', headerName: 'Workout Instructions', flex: 1} ];

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
                        <Add onClick={addRow()}/>
                    </Fab>
                </Grid2>
            </Grid2>
        </div>
    )
  }

export default DataGridTable