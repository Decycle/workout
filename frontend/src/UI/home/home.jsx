import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useAuth0 } from '@auth0/auth0-react'

import BarChart from './bar'
import PieChart from './pie'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Unstable_Grid2'

import AppBar from '../appBar'

const difficultyLabel = [
  'beginner',
  'intermediate',
  'expert',
]
const workoutTypeLabel = [
  'cardio',
  'olympic_weightlifting',
  'plyometrics',
  'powerlifting',
  'strength',
  'stretching',
  'strongman',
]

const muscleGroupLabel = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  'triceps',
]

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

  const parsePieData = (labels, category) => (workouts) => {
    const data = labels.map((label) => {
      return workouts.filter(
        (workout) => workout[category] === label
      ).length
    })

    return {
      labels: labels,
      data: data,
    }
  }

  return (
    <Grid
      container
      sx={{
        pr: 12,
        pt: 4,
      }}>
      <Grid item xs={5}>
        <Typography variant='h5'>Past Workouts</Typography>
        <BarChart input={parseBarData(workouts)} />
      </Grid>
      <Grid item xs={5} sx={{ ml: 6 }}>
        <Typography variant='h5'>Difficulties</Typography>
        <PieChart
          input={parsePieData(
            difficultyLabel,
            'difficulty'
          )(workouts)}
        />
      </Grid>
      <Grid item xs={5} sx={{ mt: 4 }}>
        <Typography variant='h5'>Workout Types</Typography>
        <PieChart
          input={parsePieData(
            workoutTypeLabel,
            'type'
          )(workouts)}
        />
      </Grid>
      <Grid item xs={5} sx={{ mt: 4, ml: 6 }}>
        <Typography variant='h5'>Muscle Groups</Typography>
        <PieChart
          input={parsePieData(
            muscleGroupLabel,
            'muscle'
          )(workouts)}
        />
      </Grid>
    </Grid>
  )
}

const HomePage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } =
    useAuth0()

  const [userWorkouts, setUserWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchWorkouts = useCallback(async () => {
    setIsLoading(true)
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
    setIsLoading(false)
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
        isLoading ? (
          <CircularProgress
            sx={{
              margin: 'auto',
            }}
          />
        ) : userWorkouts.length !== 0 ? (
          <Charts workouts={userWorkouts} />
        ) : (
          <Typography variant='h5'>
            <Link
              to='/app/new-workout'
              style={{
                display: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid grey',
                borderRadius: '4px',
                padding: '4px',
              }}>
              Start your first workout!
            </Link>
          </Typography>
        )
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
        }}></Box>
    </Box>
  )
}

export default HomePage
