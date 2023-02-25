import { CalendarMonth, Home } from '@mui/icons-material'
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'

function App() {
  return <PermanentDrawerLeft />
}

const drawerWidth = 200

const PermanentDrawerLeft = () => {
  return (
    <Box sx={{ display: 'flex' }}>
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
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 5,
          ml: 2,
        }}>
        <Typography variant='h7' component='h1'>
          Welcome, User 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          Here is your fitness history.
        </Typography>
      </Box>
    </Box>
  )
}

export default App
