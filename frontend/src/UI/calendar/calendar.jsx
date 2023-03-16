import React, { Component,useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuth0 } from '@auth0/auth0-react'  
import dayjs from 'dayjs'
// import Typography from '@mui/material'
// import Box from '@mui/material'
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Card,
  CardContent,
  Fab,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'

const localizer = momentLocalizer(moment);

const events = [
  {
      title: "Workout",
      start: new Date(2023, 2, 2, 0, 0, 0),
      end: new Date(2023, 2, 4, 0, 0, 0),   // year, month, day, hour, minute
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", startDate: new Date(), endDate: new Date() });
  const [allEvents, setAllEvents] = useState(events);

  
  const { user } = useAuth0()
  const [userWorkouts, setUserWorkouts] = useState([])
  
  const fetchWorkouts = async (start=1678850990, end=1678850992) => {
    const response = await fetch(
      `http://localhost:8000/api/query-workouts?user=${encodeURIComponent(
        user.sub 
      )}&start=${start}&end=${end}`
    )
    const data = await response.json()
    setUserWorkouts(data)
    console.log(data)
  }
 
  // 'google-oauth2|115960661313085485469'

  useEffect(() => {
    fetchWorkouts()
  }, [])

  
  const userWorkoutsList = userWorkouts.slice()
  for (let i=0; i < userWorkoutsList.length; i++) {
    const workoutData = userWorkoutsList[i]
    const date = dayjs(workoutData.start_time * 1000) // [{user: string, workout_name: string, start_time: int, end_time: int}]
    setNewEvent({...newEvent, title: workoutData.workout_name, startDate: new Date(2023, 2, 5, 0, 0, 0), endDate: new Date(2023, 2, 6, 0, 0, 0)})
    setAllEvents([...allEvents, newEvent]);
  }
  
  
  // console.log(test)
  return (
    <div className="App">
      <Grid2 container spacing={2}>
        <Grid2 item xs={4}>
          <Typography variant='h7' component='h1'>
          Calendar
          </Typography>
        </Grid2>
      </Grid2>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={allEvents}
        selectable
        // onSelectSlot={handleAddEvent}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default App;


// const handleAddEventManually = useCallback(
  //   ({ start, end }) => {
  //     const title = window.prompt('New Event name')
  //     if (title) {
  //       setAllEvents((prev) => [...prev, { start, end, title }])
  //     }
  //   },
  //   // [setAllEvents]
  // )

   // async function fetchWorkouts() {
  //   const api = 'http://localhost:3000/api/query-workouts?user=${encodeURIComponent(';
  //   const result = await fetch(api);
  //   const getResult = await result;
  //   setUserWorkouts(getResult)
  //   console.log(getResult)
  // }
  