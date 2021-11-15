import React from 'react';
import './InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem'

export default function InterviewList(props) {

  const interviewers = props.interviewers.map((interviewer) => {
    console.log(interviewer);
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    )
  })
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}