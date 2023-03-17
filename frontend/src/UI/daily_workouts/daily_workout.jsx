import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import DataGridTable from './datagrid'

import { useCallback, useEffect, useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import AuthButton from '../authButton'

const AppBar = () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant='h7' component='h1'>
          Welcome, {isAuthenticated ? user.name : 'User'} 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          See your past workouts 🕰️
        </Typography>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <AuthButton />
      </Grid>
    </Grid>
  )
}

const DailyWorkoutPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } =
    useAuth0()

  const [userWorkouts, setUserWorkouts] = useState([])

  const fetchWorkouts = useCallback(async () => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `http://localhost:8000/api/get-workouts-data?user=${encodeURIComponent(
        user.sub
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await response.json()
    setUserWorkouts(data)
  }, [getAccessTokenSilently, user])

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts()
    }
  }, [isAuthenticated, fetchWorkouts])

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
        {isAuthenticated ? (
          userWorkouts.length ? (
            <DataGridTable
              data={userWorkouts}
              refreshFunc={fetchWorkouts}
            />
          ) : (
            <Typography variant='h5'>
              To view your workout schedule, add a workout
              first!
            </Typography>
          )
        ) : (
          <Typography variant='h5'>
            Please login first to view your workout
            schedule.
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default DailyWorkoutPage
