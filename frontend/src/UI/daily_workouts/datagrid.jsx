import { DataGrid } from '@mui/x-data-grid'
import { Add, Search } from '@mui/icons-material'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Backdrop,
  CircularProgress,
  Fab,
} from '@mui/material'
import { Close, DeleteForever } from '@mui/icons-material'
import dayjs from 'dayjs'

import { useEffect, useState, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import ViewWorkoutPage from '../calendar/viewWorkout'

const columns = [
  {
    field: 'workout_name',
    headerName: 'Workout',
    width: 500,
  },
  {
    field: 'start_time',
    headerName: 'Start time',
    flex: 0.5,
  },
  { field: 'end_time', headerName: 'End time', flex: 0.5 },
]

const DataGridTable = ({ data, navigate }) => {
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
  const [openView, setOpenView] = useState(false)
  const [workoutData, setWorkoutData] = useState({})

  const fetchWorkouts = useCallback(async () => {
    setIsLoading(true)
    const response = await fetch(
      `http://localhost:8000/api/get-workouts?user=${encodeURIComponent(
        user.sub
      )}`
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

    console.log('events', events)

    setIsLoading(false)
    setEvents(events)
  }, [time, user.sub])

  const handleSelect = async (event) => {
    const name = event.workout_name
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

    console.log('data', data)

    setIsLoading(false)
    setWorkoutData(data)
    setOpenView(true)
  }

  //   var rows = []

  //   for (let entry in data) {
  //     let id = data[entry]._id
  //     let workout_name = data[entry].workout_name
  //     let start_time = dayjs(
  //       data[entry].start_time * 1000
  //     ).format('LT')
  //     let end_time = dayjs(
  //       data[entry].end_time * 1000
  //     ).format('LT')
  //     let row = {
  //       id: id,
  //       workout_name: workout_name,
  //       start_time: start_time,
  //       end_time: end_time,
  //     }
  //     rows.push(row)
  //   }

  //   console.log('rows', rows)

  return (
    <div style={{ height: 300, width: '75%' }}>
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
      <DataGrid
        autoHeight
        columns={columns}
        rows={events.map((event) => {
          return {
            id: event.id,
            workout_name: event.title,
            start_time: dayjs(event.start).format('LT'),
            end_time: dayjs(event.end).format('LT'),
          }
        })}
        getRowId={(row) => row.id}
        onRowClick={(rowData) => handleSelect(rowData.row)}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />

      {workoutData && (
        <ViewWorkoutPage
          open={openView}
          closeFunc={() => setOpenView(false)}
          data={workoutData}
          refreshFunc={fetchWorkouts}
        />
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
    </div>
  )
}

export default DataGridTable
