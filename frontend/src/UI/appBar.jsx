import { useAuth0 } from '@auth0/auth0-react'
import Grid from '@mui/material/Unstable_Grid2'
import { Typography } from '@mui/material'

import AuthButton from './authButton'

const AppBar = ({ message }) => {
  const { user, isAuthenticated } = useAuth0()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant='h7' component='h1'>
          Welcome, {isAuthenticated ? user.name : 'User'} 👋
        </Typography>

        <Typography variant='subtitle1' component='h1'>
          {message}
        </Typography>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <AuthButton />
      </Grid>
    </Grid>
  )
}

export default AppBar
