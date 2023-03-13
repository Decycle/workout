import { useEffect, useState } from 'react'
import { Add, Circle, Search } from '@mui/icons-material'
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
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}>
      {workoutData.map((data) => (
        <ListItem key={data.name}>
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

  const searchExercise = useCallback(async () => {
    console.log(search)

    const response = await fetch(
      `http://127.0.0.1:8000/api/search?prompt=${encodeURIComponent(
        search
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
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
