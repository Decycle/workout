import { Add } from '@mui/icons-material'
import { Box, Typography, Fab } from '@mui/material'
import dayjs from 'dayjs'

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import BarChart from './bar'
import PieChart from './pie'
import { useCallback, useEffect, useState } from 'react'

import Grid from '@mui/material/Unstable_Grid2'

import AppBar from '../appBar'

const Charts = ({ workouts }) => {
  const parseBarData = (workouts) => {
    const today = dayjs()

    const labels = new Array(7).fill(0).map((_, i) => {
      return today.subtract(i, 'day').format('ddd')
    })

    const data = labels.map((_, i) => {
      const date = today
        .subtract(i, 'day')
        .format('YYYY-MM-DD')

      const filteredWorkouts = workouts.filter(
        (workout) => {
          return (
            dayjs(workout['start_time'] * 1000).format(
              'YYYY-MM-DD'
            ) === date
          )
        }
      )
      return filteredWorkouts.length
    })

    return {
      labels: labels.reverse(),
      data: data.reverse(),
    }
  }

  const parsePieData = (workouts) => {
    console.log(workouts)
    const labels = ['beginner', 'intermediate', 'expert']
    const data = labels.map((label) => {
      return workouts.filter(
        (workout) => workout['difficulty'] === label
      ).length
    })
    console.log(data)

    return {
      labels: labels,
      data: data,
    }
  }

  return (
    <Box sx={{ maxWidth: 600 }}>
      {workouts.length !== 0 && (
        <BarChart input={parseBarData(workouts)} />
      )}
      {workouts.length !== 0 && (
        <PieChart input={parsePieData(workouts)} />
      )}
    </Box>
  )
}

const HomePage = () => {
  const navigate = useNavigate()
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
  }, [fetchWorkouts, isAuthenticated])

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        bgcolor: 'paper.main',
        p: 5,
        ml: 2,
      }}>
      <AppBar message='Here is your fitness history 📈' />
      {isAuthenticated ? (
        <Charts workouts={userWorkouts} />
      ) : (
        <Typography variant='h5'>
          Please login to view your fitness history
        </Typography>
      )}
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
    </Box>
  )
}

export default HomePage
