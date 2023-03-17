import {
  CalendarMonth,
  CalendarToday,
  FitnessCenter,
  Home,
} from '@mui/icons-material'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import HomePage from './home/home'
import NewWorkOutPage from './newWorkout/newWorkout'
import CalendarPage from './calendar/calendar'
import DailyWorkoutPage from './daily_workouts/daily_workout'

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
          <ListItemButton
            onClick={() => navigate('/app/home')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>

        <ListItem key={'New_Workout'}>
          <ListItemButton
            onClick={() => navigate('/app/new-workout')}>
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary={'Workout'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Calendar'}>
          <ListItemButton
            onClick={() => navigate('/calendar')}>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText primary={'Calendar'} />
          </ListItemButton>
        </ListItem>

        <ListItem key={'Daily_Workout'}>
          <ListItemButton
            onClick={() => navigate('/daily-workout')}>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText primary={'Today\'s Workout'} />
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
        <Route
          path='/'
          element={<Navigate to='/app/home' />}
        />
        <Route
          path='/app'
          element={<Navigate to='/app/home' />}
        />
        <Route
          path='/app/home'
          exact
          element={<HomePage />}
        />
        <Route
          path='/app/new-workout'
          exact
          element={<NewWorkOutPage />}
        />
        <Route
          path='/daily-workout'
          exact
          element={<DailyWorkoutPage />}
        />
        <Route
          path='/calendar'
          exact
          element={<CalendarPage />}
        />
      </Routes>
    </Box>
  )
}

export default App
