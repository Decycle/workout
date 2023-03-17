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
import dayjs from 'dayjs'
import { Close, DeleteForever } from '@mui/icons-material'
import { useAuth0 } from '@auth0/auth0-react'

const ViewWorkoutPage = ({
  open,
  closeFunc,
  data,
  refreshFunc,
}) => {
  const { getAccessTokenSilently } = useAuth0()

  const deleteWorkout = async () => {
    const token = await getAccessTokenSilently()
    const response = await fetch(
      `http://localhost:8000/api/delete-workout?id=${encodeURIComponent(
        data.id
      )}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export default ViewWorkoutPage
