import { useState } from 'react'
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
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import SearchBar from '../searchbar'

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

  const searchExercise = async () => {
    console.log(exerciseType)
    console.log(muscleType)
    console.log(difficultyType)

    const requestUrl =
      'https://api.api-ninjas.com/v1/exercises'

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key':
          'VPL/zRxgNx/o43ZtrGMS4A==W1hr1nw2TT4k7Gy9',
      },
    })

    const data = await response.json()

    console.log(data)
  }

  return (
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
        onChange={(event, newValue) => {
          setExerciseType(newValue)
        }}
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
        >
        <Search sx={{ mr: 1 }} />
        Search Exercise
      </Fab>
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
