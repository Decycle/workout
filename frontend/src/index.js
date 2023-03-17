import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './UI/App'
import reportWebVitals from './reportWebVitals'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme from './UI/theme'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const root = ReactDOM.createRoot(
  document.getElementById('root')
)
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='decycle.us.auth0.com'
      clientId='xWovAgPiKvlIkrntto5ZGoHRZNRZNgDc'
      authorizationParams={{
        redirect_uri: 'http://localhost:3000/app/home',
      }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
