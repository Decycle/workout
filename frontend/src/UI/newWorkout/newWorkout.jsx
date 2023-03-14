import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
  Add,
  Circle,
  Clear,
  Delete,
  Search,
} from '@mui/icons-material'
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Card,
  CardContent,
  Fab,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Slider,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import {
  DemoContainer,
  DemoItem,
} from '@mui/x-date-pickers/internals/demo'
import AuthButton from '../authButton'
import { useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  DesktopDateTimePicker,
  StaticDateTimePicker,
} from '@mui/x-date-pickers'

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

const ListView = ({
  workoutData,
  openFunc,
  selectFunc,
}) => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
      }}>
      {workoutData.map((data) => (
        <ListItem
          key={data.name}
          secondaryAction={
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={() => {
                openFunc()
                selectFunc(data)
              }}>
              <Add />
            </IconButton>
          }>
          <ListItemAvatar>
            <Circle
              sx={{
                color:
                  data.difficulty === 'beginner'
                    ? 'green'
                    : data.difficulty === 'intermediate'
                    ? 'orange'
                    : 'red',
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={data.name}
            secondary={data.type}
          />
        </ListItem>
      ))}
    </List>
  )
}

const NewWorkoutForm = () => {
  const [search, setSearch] = useState('')
  const [workoutData, setWorkoutData] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [currentWorkoutData, setCurrentWorkoutData] =
    useState(null)
  const [openPage, setOpenPage] = useState(false)

  const searchExercise = useCallback(async (prompt) => {
    console.log(prompt)
    setIsLoading(true)

    const response = await fetch(
      `http://localhost:8000/api/search?prompt=${encodeURIComponent(
        prompt
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    setIsLoading(false)
    setWorkoutData(data)
    console.log(data)
  }, [])

  const sampleSearch = [
    'easy arm workout',
    'advanced leg training',
    'relaxing yoga',
    'upper arm strength training',
    'chest workout',
    'full body workout',
    'weight loss routine',
    'beginner workout',
    'easy strength training',
  ]

  return (
    <Box
      sx={{
        mt: 2,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
      <TextField
        id='outlined-basic'
        label='Search'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  setSearch('')
                }}>
                {search === '' ? <Search /> : <Clear />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchExercise(search)
          }
        }}
      />
      {search === '' && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {sampleSearch
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map((data) => (
              <Button
                key={data}
                variant='outlined'
                size='small'
                onClick={() => {
                  console.log(data)
                  setSearch(data)
                  searchExercise(data)
                }}>
                {data}
              </Button>
            ))}
        </Box>
      )}
      {isLoading && (
        <CircularProgress
          sx={{
            margin: 'auto',
          }}
        />
      )}
      <ListView
        workoutData={workoutData}
        openFunc={() => setOpenPage(true)}
        selectFunc={setCurrentWorkoutData}
      />
      {currentWorkoutData && (
        <AddWorkoutPage
          open={openPage}
          closeFunc={() => setOpenPage(false)}
          data={currentWorkoutData}
        />
      )}
    </Box>
  )
}

const AddWorkoutPage = ({ open, closeFunc, data }) => {
  const { getAccessTokenSilently } = useAuth0()

  const [startTime, setStartTime] = useState(dayjs())
  const [duration, setDuration] = useState(20)

  const addExercise = async (name) => {
    const token = await getAccessTokenSilently()
    console.log(startTime)

    const endTime = startTime.add(duration, 'minute')

    const startSeconds = startTime.unix()
    const endSeconds = endTime.unix()

    console.log(
      `http://localhost:8000/api/add-workout?name=${encodeURIComponent(
        name
      )}&start=${startSeconds}&end=${endSeconds}`
    )

    const response = await fetch(
      `http://localhost:8000/api/add-workout?name=${encodeURIComponent(
        name
      )}&start=${startSeconds}&end=${endSeconds}
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

const NewWorkOutPage = () => {
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
      <AppBar />
      {isAuthenticated ? (
        <NewWorkoutForm />
      ) : (
        <Typography variant='h5'>
          Please login first to add a workout
        </Typography>
      )}
    </Box>
  )
}

export default NewWorkOutPage
