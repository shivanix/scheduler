
import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";

import Appointment from "./Appointment";
import axios from "axios";

/*-------------------------------------------------------------------appointments-----------------------------*/
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Zingiber officinalis",
      interviewer:{
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },

  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Anton Van Leeuwenhoek",
      interviewer:     {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },

  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Schleiden",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];

/*-----------------------------------days data--------------------------------------------*/
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];
/*-------------------------------------------------------------------------------*/

export default function Application(props) {
  const [day_, setDay_] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
Axios.get(`/api/days`).then((response) =>{
// console.log("", response);

  setDays([...response.data])
})
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
  days={days}
  day={day_}
  setDay={setDay_}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return(<Appointment key={appointment.id} {...appointment} />
  )}
  )}<Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
