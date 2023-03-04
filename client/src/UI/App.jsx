import {
  CalendarMonth,
  Home,
  Search,
} from '@mui/icons-material'
import {
  Box,
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

import HomePage from './home/home'

const drawerWidth = 200

const DrawerLeft = () => {
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
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
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
      <HomePage />
    </Box>
  )
}

export default App
