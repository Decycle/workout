import { Button } from '@mui/material'

const SignInButton = () => {
  return (
    <a href='/login'>
      <Button
        variant='contained'
        sx={{
          position: 'absolute',
          right: 20,
          top: 20,
          height: 40,
          width: 120,
        }}
        size='large'>
        <b> Sign In </b>
      </Button>
    </a>
  )
}

export default SignInButton
