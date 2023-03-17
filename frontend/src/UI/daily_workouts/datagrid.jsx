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
import dayjs from 'dayjs'

const columns = [ 
    {field: 'workout_name', headerName: 'Workout', width: 200}, 
    {field: 'start_time', headerName: 'Start time', flex: .5}, 
    {field: 'end_time', headerName: 'End time', flex: .5}, 
    {field: 'workout_info', headerName: 'Workout Instructions', flex: 1} ];

  const DataGridTable = ({data, navigate}) => {

    var rows = []

    for (let entry in data) {
        let id = data[entry]._id
        let workout_name = data[entry].workout_name
        let start_time = dayjs(data[entry].start_time * 1000).format('LT')
        let end_time = dayjs(data[entry].end_time * 1000).format('LT')
        let row = {
            id: id, 
            workout_name: workout_name, 
            start_time: start_time, 
            end_time: end_time
        }
        rows.push(row)
        // console.log(data[entry].workout_name)
    }

    // console.log(rows)
    // console.log(typeof(rows))

    return (
        <div style={{height: 300, width: '75%'}}>
            <DataGrid rows={rows} getRowId={(row)=>row.id} columns={columns} initialState={{
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