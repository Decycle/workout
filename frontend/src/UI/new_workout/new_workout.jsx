import { useEffect, useState } from 'react'
import { Add, Search } from '@mui/icons-material'
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
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import SearchBar from '../searchbar'
import { DataGrid } from '@mui/x-data-grid'
import { useCallback } from 'react'

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
        <SearchBar />
      </Grid2>
    </Grid2>
  )
}

const ListView = ({ workoutData }) => {
  console.log(workoutData)
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 180,
        bgcolor: 'background.paper',
      }}>
      {workoutData.map((data) => (
        <ListItem key={data.name}>
          <ListItemText
            primary={data.name}
            secondary={data.type}
          />
        </ListItem>
      ))}
    </List>
  )
}
const exerciseTypes = [
  { label: 'Any', value: 'any' },
  { label: 'Cardio', value: 'cardio' },
  {
    label: 'Olympic Weightlifting',
    value: 'olympic_weightlifting',
  },
  { label: 'Plyometrics', value: 'plyometrics' },
  { label: 'Powerlifting', value: 'powerlifting' },
  { label: 'Strength', value: 'strength' },
  { label: 'Stretching', value: 'stretching' },
  { label: 'Strongman', value: 'strongman' },
]

const muscleTypes = [
  { label: 'Any', value: 'any' },
  { label: 'Abdominals', value: 'abdominals' },
  { label: 'Abductors', value: 'abductors' },
  { label: 'Adductors', value: 'adductors' },
  { label: 'Biceps', value: 'biceps' },
  { label: 'Calves', value: 'calves' },
  { label: 'Chest', value: 'chest' },
  { label: 'Forearms', value: 'forearms' },
  { label: 'Glutes', value: 'glutes' },
  { label: 'Hamstrings', value: 'hamstrings' },
  { label: 'Lats', value: 'lats' },
  { label: 'Lower Back', value: 'lower_back' },
  { label: 'Middle Back', value: 'middle_back' },
  { label: 'Neck', value: 'neck' },
  { label: 'Quadriceps', value: 'quadriceps' },
  { label: 'Traps', value: 'traps' },
  { label: 'Triceps', value: 'triceps' },
]

const difficultyTypes = [
  { label: 'Any', value: 'any' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Expert', value: 'expert' },
]

const NewWorkoutForm = () => {
  const [exerciseType, setExerciseType] = useState({
    label: 'Any',
    value: 'any',
  })

  const [muscleType, setMuscleType] = useState({
    label: 'Any',
    value: 'any',
  })

  const [difficultyType, setDifficultyType] = useState({
    label: 'Any',
    value: 'any',
  })

  const [workoutData, setWorkoutData] = useState([])

  const searchExercise = useCallback(async () => {
    console.log(exerciseType)
    console.log(muscleType)
    console.log(difficultyType)

    const requestUrl =
      'https://api.api-ninjas.com/v1/exercises?'

    const searchParams = {}

    if (exerciseType.value !== 'any') {
      searchParams.exercise_type = exerciseType.value
    }

    if (muscleType.value !== 'any') {
      searchParams.muscle_group = muscleType.value
    }

    if (difficultyType.value !== 'any') {
      searchParams.difficulty = difficultyType.value
    }

    const response = await fetch(
      requestUrl + new URLSearchParams(searchParams),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key':
            'VPL/zRxgNx/o43ZtrGMS4A==W1hr1nw2TT4k7Gy9',
        },
      }
    )

    const data = await response.json()
    setWorkoutData(
      data.map((data, index) => ({
        id: index,
        ...data,
      }))
    )
    console.log(data)
  }, [difficultyType, exerciseType, muscleType])

  // useEffect(() => {
  //   searchExercise()
  // }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
      }}>
      <Box
        sx={{
          mt: 2,
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
        <Autocomplete
          disableClearable
          options={exerciseTypes}
          value={exerciseType}
          onChange={(_, newValue) => {
            setExerciseType(newValue)
          }}
          isOptionEqualToValue={(option, value) =>
            option.value === value.value
          }
          renderInput={(params) => (
            <TextField {...params} label='Exercise Types' />
          )}
        />
        <Autocomplete
          disableClearable
          options={muscleTypes}
          value={muscleType}
          onChange={(event, newValue) => {
            setMuscleType(newValue)
          }}
          isOptionEqualToValue={(option, value) =>
            option.value === value.value
          }
          renderInput={(params) => (
            <TextField {...params} label='Muscle Groups' />
          )}
        />

        <Autocomplete
          disableClearable
          options={difficultyTypes}
          value={difficultyType}
          onChange={(event, newValue) => {
            setDifficultyType(newValue)
          }}
          isOptionEqualToValue={(option, value) =>
            option.value === value.value
          }
          renderInput={(params) => (
            <TextField {...params} label='Difficulty' />
          )}
        />

        <Fab
          variant='extended'
          size='medium'
          color='primary'
          aria-label='add'
          sx={{ mt: 2 }}
          onClick={searchExercise}>
          <Search sx={{ mr: 1 }} />
          Search Exercise
        </Fab>
      </Box>

      <ListView workoutData={workoutData} />
    </Box>
  )
}

const NewWorkOutPage = () => {
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
      <NewWorkoutForm />
    </Box>
  )
}

export default NewWorkOutPage
