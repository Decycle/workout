import {
  CalendarMonth,
  Home,
  Search,
} from '@mui/icons-material'
import {
  AppBar,
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
          bgcolor: 'paper.main',
          p: 5,
          ml: 2,
        }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={4}>
            <Typography variant='h7' component='h1'>
              Welcome, User 👋
            </Typography>

            <Typography variant='subtitle1' component='h1'>
              Here is your fitness history.
            </Typography>
          </Grid2>

          <Grid2
            item
            xs={8}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
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
              }}></TextField>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  )
}

export default App
