import React from "react";

import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerItem(props){
  console.log("#INTERVIWER ITEM PROPS#", props);
let interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': props.selected});


  return (<li className={interviewerClass} onClick = { ()=> props.setInterviewer(props.interviewer.id) }>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>);
}

