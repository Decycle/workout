import { useState } from 'react'
import dayjs from 'dayjs'

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Slider,
} from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { DesktopDateTimePicker } from '@mui/x-date-pickers'

const AddWorkoutPage = ({
  open,
  closeFunc,
  data,
  defaultTime,
  refreshFunc,
}) => {
  const { user, getAccessTokenSilently } = useAuth0()

  const [startTime, setStartTime] = useState(
    defaultTime ? dayjs(defaultTime) : dayjs()
  )
  const [duration, setDuration] = useState(20)

  const addExercise = async (name) => {
    const token = await getAccessTokenSilently()
    console.log(startTime)

    const endTime = startTime.add(duration, 'minute')

    const startSeconds = startTime.unix()
    const endSeconds = endTime.unix()

    const response = await fetch(
      `http://localhost:8000/api/add-workout?name=${encodeURIComponent(
        name
      )}&user=${
        user.sub
      }&start=${startSeconds}&end=${endSeconds}
      `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    console.log(name)
    console.log(data)

    refreshFunc && refreshFunc()
    closeFunc()
  }

  const timeMarks = [
    {
      value: 0,
      label: '0m',
    },
    {
      value: 10,
      label: '10m',
    },
    {
      value: 20,
      label: '20m',
    },
    {
      value: 30,
      label: '30m',
    },
    {
      value: 60,
      label: '60m',
    },
    {
      value: 120,
      label: '120m',
    },
  ]

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
        <Box
          sx={{
            mt: 2,
          }}>
          Start time
        </Box>
        <DesktopDateTimePicker
          sx={{
            width: 300,
          }}
          value={startTime}
          onChange={(value) => setStartTime(value)}
        />
        <Box>
          Duration
          <Slider
            aria-label='Custom marks'
            defaultValue={20}
            getAriaValueText={(value) => `${value}m`}
            step={1}
            min={0}
            max={120}
            valueLabelDisplay='auto'
            marks={timeMarks}
            onChange={(e, value) => setDuration(value)}
            value={duration}
          />
        </Box>
      </DialogContent>
      <Button
        sx={{
          p: 2,
        }}
        onClick={() => addExercise(data.name)}>
        Add
      </Button>
    </Dialog>
  )
}

export default AddWorkoutPage
