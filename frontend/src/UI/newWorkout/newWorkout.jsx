import { Box, Typography } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import WorkoutSearchBar from './workoutSearchBar'

import AppBar from '../appBar'

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
      <AppBar message='Create a new workout 💪' />
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
