import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


import useVisualMode from "hooks/useVisualMode";

import"components/Appointment/styles.scss";

/*-------------------------------Modes--------------------- */
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

  props
   .bookInterview(props.id, interview)
   .then(() => transition(SHOW))
   .catch(error =>{
    transition(ERROR_SAVE, true) 

  });
  

  console.log('Interview: ', interview);
  console.log('id: ', props.id);
}

/*---------------------Func destroy---------------------- */

function destroy(){

  transition(DELETING, true);

  props.cancelInterview(props.id)
  .then (() =>  transition(EMPTY))
  .catch(error => {
    transition(ERROR_DELETE, true)
    
  });

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
    onConfirm={destroy}
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

{mode=== ERROR_SAVE &&
<Error
message={`Oops! Could not save this appointment!`}
onClose={back}
/>
}

{mode=== ERROR_DELETE &&
<Error
message={`Server doesn't want to cancel this appointment!`}
onClose={back}
/>
}

    </article>)
}


