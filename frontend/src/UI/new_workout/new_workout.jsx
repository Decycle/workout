import { useEffect, useState } from 'react'
import {
  Add,
  Circle,
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

  const searchExercise = useCallback(async () => {
    console.log(search)
    setIsLoading(true)

    const response = await fetch(
      `api/query?query=${encodeURIComponent(search)}`,
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
  }, [search])

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
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchExercise()
          }
        }}
      />
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
      </DialogContent>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton>
          <Add />
        </IconButton>
      </Box>
    </Dialog>
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
