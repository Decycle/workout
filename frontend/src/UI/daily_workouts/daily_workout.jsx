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
import DataGridTable from './datagrid'
import dayjs from 'dayjs'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react' 

import AuthButton from '../authButton'

const today = new Date()
  let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
  let time = Math.floor(new Date(today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate()).getTime() / 1000)

const AppBar = () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    <Grid2 container spacing={2}>
      <Grid2 item xs={6}>
        <Typography variant='h7' component='h1'>
          Welcome, {isAuthenticated ? user.name : 'User'} 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          {isAuthenticated ? 'Here is your workout schedule for ' + date : 'View your workout plan for the day.' }
        </Typography>
      </Grid2>

      <Grid2
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <AuthButton />
      </Grid2>
    </Grid2>
  )
}

const DailyWorkoutPage = () => {
  const navigate = useNavigate()
  const { user, getAccessTokenSilently, isAuthenticated } =
    useAuth0()

  const [userWorkouts, setUserWorkouts] = useState([])
  const [parsedWorkout, setParsedWorkout] = useState({})
  const [hasWorkoutsToday, setHasWorkoutsToday] = useState(false)

  const fetchWorkouts = async () => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `http://localhost:8000/api/get-workouts?user=${encodeURIComponent(
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
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts()
    }
  }, [isAuthenticated])

  // console.log(userWorkouts)

  const parseWorkout = (workouts) => {
    const today = dayjs()

    const date = today
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
    
    setParsedWorkout(filteredWorkouts)
  }

  useEffect(() => {
    if (userWorkouts.length > 0) {
      parseWorkout(userWorkouts)
      console.log(userWorkouts)
    }
  }, [userWorkouts])

  useEffect(() => {
    if (parsedWorkout.length > 0) {
      setHasWorkoutsToday(true)
    }
  }, [parsedWorkout])

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
        {isAuthenticated ? (
          hasWorkoutsToday ? <DataGridTable data = {parsedWorkout} navigate = {navigate}/> : 
            <Typography variant='h5'>
              To view your workout schedule, add a workout first!
            </Typography>
        ) : (
          <Typography variant='h5'>
            Please login first to view your workout schedule.
          </Typography>
        )}
        </Box>
      </Box>
    )
  }

export default DailyWorkoutPage