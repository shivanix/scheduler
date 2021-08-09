import React, { useState } from 'react'

import InterviewerList from "components/InterviewerList";

import Button from "components/Button";

export default function Form (props){
   console.log("#FORM PROPS#", props);

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer && props.interviewer.id || null);
  
  // console.log("ffffffffffffffffffffff", props.interviewer);

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

  // console.log("%%%%%%%%----", props.interviewers);

return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">

    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
      
        onChange={onChangeName}
        // onChange={(event) => {setName(event.target.value)}}
        name="name"
        type="text"
        placeholder="Enter Student Name"
        
      />
    </form>
    <InterviewerList
    interviewers={props.interviewers}
    interviewer={interviewer}
    setInterviewer = {onChangeInterviewer} />
  </section>

  {/* 444-----  */}


  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {Cancel}>Cancel</Button>
      <Button confirm onClick = {()=> props.onSave(name, interviewer)}>Save</Button>
    </section>
  </section>
</main>
)
}