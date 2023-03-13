import React, { Component,useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
      title: "Workout",
      allDay: true,
      start: new Date(),
      end: new Date(),
  },
];

function App() {
  // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
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
