
import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";

import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {
  const [state, setState] = useState({
     day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  /*----------------------------Func bookInterview------------------*/
  
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(id, interview);
    setState({
      ...state,
      appointments
    });
  }
  
/*--------------------------------------------------------------------- */

  const setDay = day => setState(prev => ({ ...prev, day }));
  
useEffect(() => {
  Promise.all([
    Axios.get(`/api/days`),
    Axios.get(`/api/appointments`),
    Axios.get(`/api/interviewers`)
  ]).then((responses) => {

    //responses stores all the reponses in an order in an array
    // responses[0] would be the first reponse; responses[1] would be the 2nd response
    // we want the data from each of the response objects, we access that using '.data'


    //Updating the states with the responses
    setState(prev => ({
      ...prev,
      days: responses[0].data,
      appointments: responses[1].data,
      interviewers: responses[2].data,

    }));

    const [first, second, third] = responses;
    // console.log("one&2****", first, second, third);
    // console.log("#STATE#", state);
    // console.log("interviewers", third.data);
    // console.log(responses[2].data);
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
        
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return(<Appointment 
         
          key={appointment.id} 
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview = {bookInterview} />
  )}
  )}<Appointment bookInterview = {bookInterview} key="last" time="5pm" />
      </section>
    </main>
  );
}
