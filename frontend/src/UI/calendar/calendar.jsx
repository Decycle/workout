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
  Backdrop,
  CircularProgress,
} from '@mui/material'
import WorkoutSearchBar from '../newWorkout/workoutSearchBar'
import AppBar from '../appBar'
import ViewWorkoutPage from './viewWorkout'

const localizer = dayjsLocalizer(dayjs)

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
  const { isAuthenticated, user, getAccessTokenSilently } =
    useAuth0()
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
    setIsLoading(true)
    const token = await getAccessTokenSilently()
    const response = await fetch(
      `http://localhost:8000/api/query-workouts?user=${encodeURIComponent(
        user.sub
      )}&start=${Math.floor(
        time.start / 1000
      )}&end=${Math.floor(time.end / 1000)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()

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
  }, [time, user.sub, getAccessTokenSilently])

  const handleSelect = async (event) => {
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
    const start = new Date(event.start)
    start.setHours(12, 0, 0, 0)
    setCreateTime(start)
    setOpenCreate(true)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts()
    }
  }, [fetchWorkouts, isAuthenticated, time])

  const onRangeChange = (event) => {
    if ('start' in event && 'end' in event) {
      setTime({
        start: event.start.getTime(),
        end: event.end.getTime(),
      })
    } else if (Array.isArray(event)) {
      if (event.length > 1) {
        setTime({
          start: event[0].getTime(),
          end: event.slice(-1)[0].getTime(),
        })
      } else {
        const start_time = new Date(event)
        const end_time = new Date(event)
        start_time.setHours(0, 0, 0, 0)
        end_time.setHours(23, 59, 59, 999)

        setTime({
          start: start_time.getTime(),
          end: end_time.getTime(),
        })
      }
    } else {
      console.error(
        'Invalid event type in onRangeChange',
        event
      )
    }
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

  const calendarStyle = {
    height: '600px',
    margin: '50px'
  };

  return (
    <div>
      {isAuthenticated && (
        <Box
          sx={{
            ml: -6,
          }}>
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
            onRangeChange={onRangeChange}
            onSelectEvent={handleSelect}
            onSelectSlot={handleCreate}
            style={calendarStyle}
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
        </Box>
      )}
    </div>
  )
}

const CalenderPage = () => {
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
      <AppBar message='View your calendar 📅' />
      {isAuthenticated ? (
        <Calender />
      ) : (
        <Typography variant='h5'>
          Please login to view your calendar
        </Typography>
      )}
    </Box>
  )
}

export default CalenderPage
