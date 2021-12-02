// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
import './styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const interview = props.interview;

  function save(name, interviewer) {
  
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE), true)
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(DELETING, true)
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE), true)
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("interview", interview)
  return(
    <article>
      <Header time={props.time}/>
    {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
    {mode === SAVING && (<Status message={"Saving"} />)}
    {mode === ERROR_SAVE && (
      <Error 
        message={"Could not save appointment"}
        onClose={() => transition(EMPTY)}
      />
    )}
    {mode === DELETING && (<Status message={"Deleting"} />)}
    {mode === ERROR_DELETE && (
      <Error 
        message={"Could not delete appointment"}
        onClose={() => transition(SHOW)}
      />
    )}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        message={"Are you sure you would like to delete?"} 
        onConfirm={cancel}
        onCancel={() => back(SHOW)}
      />
    )}
    {mode === CREATE && (
      <Form
        onSave={save}
        onCancel={() => back(EMPTY)}
        student={props.student}
        interviewer={props.interviewer}
        interviewers={props.interviewers} 
        />
    )}
    {mode === EDIT && (
      <Form 
        onSave={save}
        onCancel={() => back(SHOW)}
        student={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={props.interviewers}
      />
    )}
    </article>
  )
}