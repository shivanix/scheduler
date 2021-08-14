import React from "react";
import InterviewerItem from "./InterviewerListItem";

import PropTypes from 'prop-types';

import "components/InterviewerList.scss"

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props){
 
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
