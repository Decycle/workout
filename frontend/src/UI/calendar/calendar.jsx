import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  Calendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useAuth0 } from '@auth0/auth0-react'
import dayjs from 'dayjs'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { Close, DeleteForever } from '@mui/icons-material'
import Grid2 from '@mui/material/Unstable_Grid2'

import AuthButton from '../authButton'
import WorkoutSearchBar from '../newWorkout/workoutSearchBar'

const localizer = dayjsLocalizer(dayjs)

const AppBar = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 item xs={4}>
        <Typography variant='h7' component='h1'>
          Welcome, User 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          Create a new workout. 💪
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

const ViewWorkoutPage = ({
  open,
  closeFunc,
  data,
  refreshFunc,
}) => {
  const deleteWorkout = async () => {
    const response = await fetch(
      `http://localhost:8000/api/delete-workout?id=${encodeURIComponent(
        data.id
      )}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const res = await response.json()
    console.log(res)
    refreshFunc()
    closeFunc()
  }

  return (
    <Dialog open={open} onClose={closeFunc}>
      <DialogTitle sx={{ m: 0, pb: 3 }} variant='h5'>
        {data.name}
      </DialogTitle>
      <DialogContent>
        <Typography variant='subtitle1' component='h1'>
          <b>Workout type</b>
          {` : ${data.type}`}
        </Typography>
        <Typography variant='subtitle1' component='h1'>
          <b>Muscle Group</b>
          {` : ${data.muscle}`}
        </Typography>
        <Typography variant='subtitle1' component='h1'>
          <b>Difficulty</b>
          {` : ${data.difficulty}`}
        </Typography>
        <Typography variant='subtitle1' component='h1'>
          <b>Instructions</b>
          {` : ${data.instructions}`}
        </Typography>
        <Typography variant='subtitle1' component='h1'>
          <b>
            Start Time:{' '}
            {dayjs(data.start_time).format(
              'YYYY/M/D h:mm A'
            )}
          </b>
        </Typography>
        <Typography variant='subtitle1' component='h1'>
          <b>
            End Time:{' '}
            {dayjs(data.end_time).format('YYYY/M/D h:mm A')}
          </b>
        </Typography>
      </DialogContent>
      <IconButton
        sx={{
          p: 2,
          width: 54,
          margin: 'auto',
        }}
        onClick={closeFunc}>
        <Close />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 2,
          width: 54,
        }}
        onClick={deleteWorkout}>
        <DeleteForever />
      </IconButton>
    </Dialog>
  )
}

const CreateWorkoutPage = ({
  open,
  closeFunc,
  defaultTime,
  refreshFunc,
}) => {
  return (
    <Dialog open={open} onClose={closeFunc}>
      <Box
        sx={{
          p: 3,
        }}>
        <WorkoutSearchBar
          defaultTime={defaultTime}
          refreshFunc={refreshFunc}
        />
      </Box>
    </Dialog>
  )
}

const Calender = () => {
  const { isAuthenticated, user } = useAuth0()
  const [events, setEvents] = useState([])

  const getDefaultTime = () => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    start.setDate(1)

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    end.setMonth(end.getMonth() + 1, 0)
    return {
      start: start.getTime(),
      end: end.getTime(),
    }
  }

  const [time, setTime] = useState(getDefaultTime())
  const [isLoading, setIsLoading] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [createTime, setCreateTime] = useState(Date.now())
  const [openView, setOpenView] = useState(false)
  const [workoutData, setWorkoutData] = useState({})

  const fetchWorkouts = useCallback(async () => {
    console.log(new Date(time.start))
    console.log(new Date(time.end))

    setIsLoading(true)
    const response = await fetch(
      `http://localhost:8000/api/query-workouts?user=${encodeURIComponent(
        user.sub
      )}&start=${Math.floor(
        time.start / 1000
      )}&end=${Math.floor(time.end / 1000)}`
    )
    const data = await response.json()
    console.log(data)

    const events = data.map((workout) => {
      return {
        title: workout.workout_name,
        start: new Date(workout.start_time * 1000),
        end: new Date(workout.end_time * 1000),
        id: workout['_id'],
      }
    })

    setIsLoading(false)
    setEvents(events)
  }, [time, user.sub])

  const handleSelect = async (event) => {
    console.log(event)
    const name = event.title
    setIsLoading(true)

    const response = await fetch(
      `http://localhost:8000/api/get-description?name=${encodeURIComponent(
        name
      )}`,
      {
        method: 'GET',
      }
    )

    const data = await response.json()

    data['start_time'] = event.start
    data['end_time'] = event.end
    data['id'] = event.id

    setIsLoading(false)
    setWorkoutData(data)
    setOpenView(true)
  }

  const handleCreate = (event) => {
    setCreateTime(event.start)
    setOpenCreate(true)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts()
    }
  }, [fetchWorkouts, isAuthenticated, time])

  const onNavigate = (date, view) => {
    let start_time = new Date(date)
    let end_time = new Date(date)

    switch (view) {
      case 'day':
        start_time.setHours(0, 0, 0, 0)
        end_time.setHours(23, 59, 59, 999)
        break

      case 'week':
        start_time.setDate(date.getDate() - date.getDay()) //get latest Sunday before that day
        end_time.setDate(start_time.getDate() + 6) //get earliest Saturday after that day
        start_time.setHours(0, 0, 0, 0)
        end_time.setHours(23, 59, 59, 999)
        break

      case 'month':
        start_time.setDate(1) //first day of the month
        end_time.setMonth(end_time.getMonth() + 1, 0) //last day of the month
        start_time.setHours(0, 0, 0, 0)
        end_time.setHours(23, 59, 59, 999)
        break

      case 'agenda':
        start_time.setHours(0, 0, 0, 0)
        end_time.setDate(start_time.getDate() + 30)
        break

      default:
        throw new Error('Invalid view type')
    }

    setTime({
      start: start_time.getTime(),
      end: end_time.getTime(),
    })
  }

  const eventStyleGetter = () => {
    return {
      className: 'event',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    }
  }

  return (
    <div>
      {isAuthenticated && (
        <div>
          {isLoading && (
            <Backdrop
              sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={true}>
              <CircularProgress color='inherit' />
            </Backdrop>
          )}
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView='month'
            events={events}
            eventPropGetter={eventStyleGetter}
            selectable
            onNavigate={onNavigate}
            onSelectEvent={handleSelect}
            onSelectSlot={handleCreate}
            style={{ height: 500, margin: '50px' }}
          />
          {workoutData && (
            <ViewWorkoutPage
              open={openView}
              closeFunc={() => setOpenView(false)}
              data={workoutData}
              refreshFunc={fetchWorkouts}
            />
          )}
          <CreateWorkoutPage
            open={openCreate}
            closeFunc={() => setOpenCreate(false)}
            defaultTime={createTime}
            refreshFunc={fetchWorkouts}
          />
        </div>
      )}
    </div>
  )
}

const CalenderPage = () => {
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
      <Calender />
    </Box>
  )
}

export default CalenderPage
