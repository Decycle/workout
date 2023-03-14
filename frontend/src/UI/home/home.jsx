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

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Grid2 from '@mui/material/Unstable_Grid2'
import BarChart from './bar'
import AuthButton from '../authButton'

const AppBar = () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    <Grid2 container spacing={2}>
      <Grid2 item xs={4}>
        <Typography variant='h7' component='h1'>
          Welcome, {isAuthenticated ? user.name : 'User'} 👋
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
        <AuthButton />
      </Grid2>
    </Grid2>
  )
}

const HomePage = () => {
  const navigate = useNavigate()

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
        <Fab
          color='primary'
          onClick={() => navigate('/new-workout')}>
          <Add />
        </Fab>
      </Box>
    </Box>
  )
}

export default HomePage
