import { Search } from '@mui/icons-material'
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

import Grid2 from '@mui/material/Unstable_Grid2'
import BarChart from './bar'

const SearchBar = () => {
  return (
    <TextField
      id='outlined-basic'
      label='Search'
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Search />
          </InputAdornment>
        ),
      }}></TextField>
  )
}

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
      <BarChart />
    </Box>
  )
}

export default HomePage
