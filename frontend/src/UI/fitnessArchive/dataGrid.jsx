import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import dayjs from 'dayjs'

import { useState } from 'react'

import ViewWorkoutPage from '../calendar/viewWorkout'

const columns = [
  {
    field: 'workout_name',
    headerName: 'Workout',
    width: 300,
  },
  {
    field: 'difficulty',
    headerName: 'Difficulty',
    width: 150,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 150,
  },
  {
    field: 'muscle',
    headerName: 'Muscle',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
  },
]

const DataGridTable = ({ data, refreshFunc }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [workoutData, setWorkoutData] = useState({})

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

    data['start_time'] = event.start * 1000
    data['end_time'] = event.end * 1000
    data['id'] = event.id

    setIsLoading(false)
    setWorkoutData(data)
    setOpenView(true)
  }

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
        rows={data.map((workout) => ({
          id: workout['_id'],
          workout_name: workout['workout_name'],
          difficulty: workout['difficulty'],
          type: workout['type'],
          muscle: workout['muscle'],
          date: dayjs(workout['start_time'] * 1000).format(
            'MM/DD/YYYY'
          ),
          start: workout['start_time'],
          end: workout['end_time'],
        }))}
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
          refreshFunc={refreshFunc}
        />
      )}
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}></Box>
    </div>
  )
}

export default DataGridTable
