import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import"components/Appointment/styles.scss";

export default function Appointment(props){

  // console.log("inreifeffffffffff", props.interview);

  //Appointment component will only render the Show component if props.interview is truthy
  return (<article className="appointment">
    <Header time={props.time}/>
    {props.interview ?  
    <Show student = {props.interview.student}
    interviewer = {props.interview.interviewer}/> : <Empty/>}
    </article>)
}


