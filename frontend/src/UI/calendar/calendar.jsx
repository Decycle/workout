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

import Grid2 from '@mui/material/Unstable_Grid2'

import DataGridCalendar from './datagrid'
import SearchBar from '../searchbar'
import { DataGrid } from '@mui/x-data-grid'

const AppBar = () => {
    return (
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <Typography variant='h7' component='h1'>
            Welcome, User 👋
          </Typography>
  
          <Typography variant='subtitle1' component='h1'>
            This is your workout calendar for this month.
          </Typography>
        </Grid2>
  
        <Grid2
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <SearchBar />
        </Grid2>
      </Grid2>
    )
  }

const CalendarPage = () => {
    return (
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: 'paper.main',
          p: 5,
          ml: 2,
        }}>
        <AppBar />
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        }}>
          <DataGridCalendar />
        </Box>
      </Box>
    )
  }

export default CalendarPage