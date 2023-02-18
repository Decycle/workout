// import { orange } from '@mui/material/colors'
import {
  createTheme,
  ThemeOptions,
} from '@mui/material/styles'

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
}

export default createTheme(themeOptions)
