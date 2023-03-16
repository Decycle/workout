import React, { Component,useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuth0 } from '@auth0/auth0-react'  
import dayjs from 'dayjs'


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

  const handleAddEvent = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setAllEvents((prev) => [...prev, { start, end, title }])
      }
    },
    // [setAllEvents]
  )
  const { user } = useAuth0()
  const [userWorkouts, setUserWorkouts] = useState([])

  const fetchWorkouts = async (start, end) => {
    const response = await fetch(
      `http://localhost:8000/api/query-workouts?user=${encodeURIComponent(
        user.sub
      )}&start=${start}&end=${end}`
    )
    const data = await response.json()
    setUserWorkouts(data)
  }
  
  const userWorkoutsList = userWorkouts.slice()
  for (let i=0; i < userWorkoutsList.length; i++) {
    const workoutData = userWorkoutsList[i]
    const date = dayjs(workoutData.start_time * 1000) // [{user: string, workout_name: string, start_time: int, end_time: int}]
    console.log(date)
    setNewEvent({title: workoutData.workout_name, startDate: new Date(2023, 2, 5, 0, 0, 0), endDate: new Date(2023, 2, 6, 0, 0, 0)})
    setAllEvents([...allEvents, newEvent]);
  }
  
  

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={allEvents}
        selectable
        onSelectSlot={handleAddEvent}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
  


export default App;
