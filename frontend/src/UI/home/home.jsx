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
import BarChart from './bar'
import SearchBar from '../searchbar'

const AppBar = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 item xs={4}>
        <Typography variant='h7' component='h1'>
          Welcome, User 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          Here is your fitness history.
        </Typography>
      </Grid2>

      <Grid2
        item
        xs={8}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <SearchBar />
      </Grid2>
    </Grid2>
  )
}

const HomePage = () => {
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
      <Box sx={{ maxWidth: 600 }}>
        <BarChart />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}>
        <Fab color='primary'>
          <Add />
        </Fab>
      </Box>
    </Box>
  )
}

export default HomePage
