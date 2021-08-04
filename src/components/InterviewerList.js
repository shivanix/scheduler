import React from "react";
import InterviewerItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props){
  console.log("#INTERVIWER LIST PROPS#", props);
  let item = props.interviewers.map((interviewer) => {

return(
  <InterviewerItem
    key = {interviewer.id}
    name = {interviewer.name}
    interviewer = {interviewer}
    avatar = {interviewer.avatar}
    setInterviewer = {props.setInterviewer}
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