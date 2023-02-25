// import { orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
      light: '#f5f7fe',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Open Sans, sans-serif',
  },
})

export default theme
