import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useAuth0 } from '@auth0/auth0-react'

import AuthButton from '../authButton'
import WorkoutSearchBar from './workoutSearchBar'

const AppBar = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 item xs={4}>
        <Typography variant='h7' component='h1'>
          Welcome, User 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          Create a new workout 💪
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

const NewWorkOutPage = () => {
  const { isAuthenticated } = useAuth0()

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
      {isAuthenticated ? (
        <WorkoutSearchBar />
      ) : (
        <Typography variant='h5'>
          Please login to create a new workout.
        </Typography>
      )}
    </Box>
  )
}

export default NewWorkOutPage
