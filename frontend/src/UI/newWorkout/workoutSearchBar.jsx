import { useCallback, useState } from 'react'
import {
  Add,
  Circle,
  Clear,
  Search,
} from '@mui/icons-material'
import {
  Box,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material'
import AddWorkoutPage from './addWorkoutPage'

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

const WorkoutSearchBar = ({ defaultTime, refreshFunc }) => {
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
          defaultTime={defaultTime}
          refreshFunc={refreshFunc}
        />
      )}
    </Box>
  )
}

export default WorkoutSearchBar
