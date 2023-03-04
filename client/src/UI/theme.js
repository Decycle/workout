// import { orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4656b9',
      light: '#f5f9ff',
      dark: '#331371',
      contrastText: '#fff2de',
    },
    secondary: {
      main: '#d10054',
      light: '#ea7da9',
      dark: '#730041',
      contrastText: '#ffffff',
    },
    paper: {
      main: '#ffffff',
    },
  },

  typography: {
    fontFamily: 'Montserrat, Open Sans, sans-serif',
  },
})

export default theme
