// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
import './styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {

  const interview = props.interview;

  return(
    !props.id ? 
    <Header time={props.time} />
    :
    (interview  ?
    <>
      <Header time={props.time} />
      <Show student={interview.student} interviewer={interview.interviewer.name}/>
    </>
    :
    <>
      <Header time={props.time} />
      <Empty />
    </>)
  )
  // return(!props.time ?
  //   <article className="appointment">No appointments</article>
  //   :
  //   <article className="appointment">Appointment at {props.time}</article>
  // )
}