import { useAuth0 } from '@auth0/auth0-react'
import { Logout } from '@mui/icons-material'
import {
  Avatar,
  Chip,
  Button,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'

const SignIn = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Button
      variant='contained'
      sx={{
        position: 'absolute',
        right: 20,
        top: 20,
        height: 40,
        width: 120,
      }}
      size='large'
      onClick={() => loginWithRedirect()}>
      <b>Sign In</b>
    </Button>
  )
}
function stringToColor(string) {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${
      name.split(' ')[1][0]
    }`,
  }
}

const UserMenu = () => {
  const { user, logout } = useAuth0()

  const [anchorEl, setAnchorEl] = useState(null)
  if (user === undefined) {
    return <div />
  }

  return (
    <div>
      <Button
        onClick={(event) => {
          setAnchorEl(event.currentTarget)
        }}>
        {user.picture !== undefined ? (
          <Avatar
            alt='User Profile'
            src={user.picture}
            sx={{ width: 56, height: 56 }}
          />
        ) : (
          <Avatar {...stringAvatar(user.name)} />
        )}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            logout({
              logoutParams: {
                returnTo: 'http://localhost:3000/app/home',
              },
            })
          }}>
          <Logout />
          Log out
        </MenuItem>
      </Menu>
    </div>
  )
}

const AuthButton = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  console.log('isAuthenticated: ', isAuthenticated)
  // console.log(user.picture)
  return (
    <div>
      {isLoading ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : isAuthenticated ? (
        <UserMenu />
      ) : (
        <SignIn />
      )}
    </div>
  )
}

export default AuthButton
