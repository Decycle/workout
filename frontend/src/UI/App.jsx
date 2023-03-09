import {
  Add,
  CalendarMonth,
  FitnessCenter,
  Home,
  Search,
} from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Container,
  Drawer,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'

import Grid2 from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  redirect,
} from 'react-router-dom'

import HomePage from './home/home'
import NewWorkOutPage from './new_workout/new_workout'

const drawerWidth = 200

const DrawerLeft = () => {
  const navigate = useNavigate()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'primary.light',
          border: 'none',
        },
      }}
      variant='permanent'
      anchor='left'>
      <Box height={100} />
      <List>
        <ListItem key={'Home'}>
          <ListItemButton onClick={() => navigate('/home')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>

        <ListItem key={'New_Workout'}>
          <ListItemButton
            onClick={() => navigate('/new-workout')}>
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary={'Workout'} />
          </ListItemButton>
        </ListItem>

        <ListItem key={'Calender'}>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText primary={'Calender'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerLeft />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' exact element={<HomePage />} />
        <Route
          path='/new-workout'
          exact
          element={<NewWorkOutPage />}
        />
      </Routes>
    </Box>
  )
}

export default App
