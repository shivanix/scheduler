import React from "react";
import InterviewerItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props){
  let item = props.interviewers.map((interviewer) => {

return(
  <InterviewerItem
    key = {interviewer.id}
    name = {interviewer.name}
    avatar = {interviewer.avatar}
    setInterviewer = {props.interviewer}
    selected = {interviewer.id === props.interviewer} 
  />
  );
});

return(
  <section className="interviewers">
    <h4 className="interviewers__header text--light">interviewer</h4>
    <ul className="interviewers__list">
    {item}
    </ul>
  </section>
  );
};