
import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";

import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  
useEffect(() => {
  Promise.all([
    Axios.get(`/api/days`),
    Axios.get(`/api/appointments`),
  ]).then((responses) => {

    //responses stores all the reponses in an order in an array
    // responses[0] would be the first reponse; responses[1] would be the 2nd response
    // we want the data from each of the response objects, we access that using '.data'

    setState(prev => ({
      ...prev,
      days: responses[0].data,
      appointments: responses[1].data
    }));

    const [first, second] = responses;
    console.log("one&2****", first, second);
    console.log("#STATE#", state);
  });

}, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">

  <DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map((appointment) => {
          return(<Appointment key={appointment.id} {...appointment} />
  )}
  )}<Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
