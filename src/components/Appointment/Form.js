import React, { useState } from 'react'

import InterviewerList from "components/InterviewerList";

import Button from "components/Button";

export default function Form (props){
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer && props.interviewer.id || null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if(!interviewer){
      setError("Interviewer cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const Cancel = () => {
    reset();
    props.onCancel();

  }
  const onChangeName = (event) => {
    setName(event.target.value)
  } 

  const onChangeInterviewer = (interviewer_id) => {
  setInterviewer(interviewer_id)
  }


return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">

    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
      
        onChange={onChangeName}

        name="name"
        type="text"
        placeholder="Enter Student Name"
        
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList
    interviewers={props.interviewers}
    interviewer={interviewer}
    setInterviewer = {onChangeInterviewer} />
  </section>

  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {Cancel}>Cancel</Button>
      <Button confirm onClick = {()=> validate(name, interviewer)}>Save</Button>
    </section>
  </section>
</main>
)
}