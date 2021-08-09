import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


import useVisualMode from "hooks/useVisualMode";

import"components/Appointment/styles.scss";

/*-------------------------------Modes--------------------- */
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM";
const EDIT = "EDIT"

/*-----------------------Appointment component-------------- */

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


// console.log("bazingaaaaaaaaaa", props);
// console.log("bazingaaaaaaaaaa###Mode", mode);
// console.log("indexjjjjjjjj", props.interview);

/*--------------------Func save -------------------- */

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props.bookInterview(props.id, interview)
  .then(() => {
    transition(SHOW);
  })
  

  console.log('Interview: ', interview);
  console.log('id: ', props.id);
}

/*---------------------Func deleting---------------------- */

function deleting(){

  transition(DELETING);

  props.cancelInterview(props.id)
  .then (() =>{
    transition(EMPTY);
  })
}

/*-----------------------Func confirmDelete---------------- */

function confirmDelete () {

  transition(CONFIRM_DELETE);
}
/*----------------------Func Edit----------------------*/

function edit () {

transition(EDIT);

console.log("interviewwer", props.interviewers);
}


return (<article className="appointment">
  <Header time={props.time}/>
    
{mode === EMPTY && 
  <Empty onAdd={() => transition(CREATE)} 
  />
}

{mode === SHOW &&
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={confirmDelete}
    onEdit={edit}
  />
}

{mode === CREATE && (
  <Form
    interviewers={props.interviewers}
    onSave={save}
    onCancel={back}
  />
)}

{mode === EDIT && (
  <Form
    name={props.interview.student}
    interviewer={props.interview.interviewer}
    interviewers={props.interviewers}
    onSave={save}
    onCancel={back}
  />
)}


{mode === CONFIRM_DELETE &&
  <Confirm
    message={`Are you really sure you want to nuke this interview? 🤔`}
    onConfirm={deleting}
    onCancel={back}
  />
}

{mode === SAVING && 
  <Status
    message={`Saving`}
  />
}

{mode === DELETING &&
  <Status
    message={`Deleting`}
  />
}
    </article>)
}


