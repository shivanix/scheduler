import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";

import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList"

import Appointment from "components/Appointment/index";

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"

/*--------------------A story is a function that returns a React element-----------*/

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


  /*------------------------Building DayListItem's states by adding stories about it--------------*/

  storiesOf("DayListItem", module) //Initiates Storybook and registers DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component

  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story


  .add("Selected", () => <DayListItem
  name="Monday" 
  spots={5} selected />) 

  .add("Full", () => 
  <DayListItem 
  name="Monday"
  spots={0} />)

  .add("Clickable", () => (
    <DayListItem 
    name="Tuesday" 
    setDay={action("setDay")}
    spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));


/*----------------------------Day List stories------------------------*/
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));


/*--------------Building the InterviewerListItem component by adding stories about it--------------*/

  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };
  
  storiesOf("InterviewerListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    ))
    .add("Selected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected
      />
    ))
    .add("Clickable", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={event => action("setInterviewer")(interviewer.id)}
      />
    ));

/*-----------------------Building the InterviewerList component by adding stories-----------------*/

  const interviewers = [{
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    },
    {
      id: 5,
      name: "Sven Jones",
      avatar: "https://i.imgur.com/twYrpay.jpg"
    }
  ];

  storiesOf("InterviewerList", module)
    .addParameters({
      backgrounds: [{
        name: "dark",
        value: "#222f3e",
        default: true
      }]
    })
    .add("Initial", () => ( <
      InterviewerList interviewers = {interviewers}
      setInterviewer = {action("setInterviewer")}
      />
    ))
    .add("Preselected", () => ( <
      InterviewerList interviewers = {interviewers}
      interviewer = {3}
      setInterviewer = {action("setInterviewer")}
      />
    ));

/*--------------------------------------Stories for Appointment-----------------------*/

  storiesOf("Appointment", module)
  storiesOf("Appointment", module)
    .addParameters({
      //using backgrd add-on to set the Storybook
    backgrounds: [{ name: "white", value: "#fff", default: true }]
    })
    //adding a story that renders the Appointment component with no props.
    .add("Appointment", () => <Appointment />)

    //adding a story that renders the Appointment component and passes it a time prop.
    .add("Appointment with Time", () => <Appointment time = "12pm" />)
    
    //Header component is the child of Appointment component, its stories are chained to Appntmnt stories
    .add("Header", () => < Header/>)
    .add("Header with Time", () => <Header time="12pm" />)

    //Empty story
    .add("Empty", () => <Empty />)
    .add("Empty on Click", () => <Empty onAdd = {action ("onAdd")} />)

    //Show stories
    .add("Show Clickable", () => < Show 
    student = "Lydia Miller-Jones"
    interviewer={interviewer}
    onEdit = {action ("onEdit")}
    onDelete = {action("onDelete")}
    />)
    
    //Confirm stories
    .add("Confirm", () => <Confirm
    message="Delete the appointment?"
    onConfirm={action("onConfirm")}
    onCancel={action("onCancel")}
  />)

    // Status story
    .add("Status", () => < Status/>)
    .add("Status deleting", () => < Status
       message="Deleting"
    />)

    //Error stories
    .add("Error", () => < Error/>)
    .add("Error", () => < Error
      message="Could not delete appointment"
      onClose={action("onClose")}
    />)

    //Form stories
    .add("Form Edit", () => < Form
    name="Lydia Miller-Jones"
    interviewers={interviewers}
    interviewer={interviewer.id}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
    
    />)

    .add("Form Create", () => < Form
    interviewers={interviewers}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
    
    />)

    //Fragment stories

    .add("Appointment Empty", () => (
      <Fragment>
        <Appointment id={1} time="12pm" />
        <Appointment id="last" time="1pm" />
      </Fragment>
    ))

    .add("Appointment Booked", () => (
      <Fragment>
        <Appointment
          id={1}
          time="12pm"
          interview={{ student: "Lydia Miller-Jones", interviewer }}
        />
        <Appointment id="last" time="1pm" />
      </Fragment>
    ))