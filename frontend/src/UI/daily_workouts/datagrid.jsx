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

const rows = [];

const columns = [ 
    {field: 'workout', headerName: 'Workout', width: 200}, 
    {field: 'start', headerName: 'Start time', flex: .5}, 
    {field: 'end', headerName: 'End time', flex: .5}, 
    {field: 'workout_info', headerName: 'Workout Instructions', flex: 1} ];

  const DataGridTable = ({data, navigate}) => {
    console.log(data)

    return (
        <div style={{height: 300, width: '75%'}}>
            <DataGrid rows={rows} columns={columns} initialState={{
                columns: {
                    columnVisibilityModel: {
                        id: false,
                    },
                },
            }} />
            <Box
            sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            }}>
                <Fab
                    color='primary'
                    onClick={() => navigate('/app/new-workout')}>
                    <Add />
                </Fab>
            </Box>
        </div>
    )
  }

export default DataGridTable