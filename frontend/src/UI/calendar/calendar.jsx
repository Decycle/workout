import React, { Component,useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
      title: "Workout",
      allDay: true,
      start: new Date(2023, 2, 1),
      end: new Date(2023, 2, 1),
  },
];



function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  // function handleAddEvent () {

  // }

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={allEvents}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
  


export default App;
