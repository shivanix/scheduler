import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


import useVisualMode from "hooks/useVisualMode";

import"components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


// console.log("bazingaaaaaaaaaa", props);
// console.log("bazingaaaaaaaaaa###Mode", mode);
// console.log("indexjjjjjjjj", props.interview);

/*--------------------Save func------------- */

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

/*---------------------Deleting func--------------------- */

function deleting(){

   transition(DELETING);

  props.cancelInterview(props.id)
  .then (() =>{
    transition(EMPTY);
  })
}



return (<article className="appointment">
  <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} 
    />
    }
  {mode === SHOW &&
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={deleting}
  />
}

{mode === CREATE && (
<Form
interviewers={props.interviewers}
onSave={save}
onCancel={back}
/>
)}

{/* {mode === CONFIRM &&
<Confirm
message={props.message}
onCancel={back}
onConfirm={deleting}

/>
} */}

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


