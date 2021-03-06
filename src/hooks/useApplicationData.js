import { useState, useEffect } from "react";
import axios from 'axios';

import { incrementSpots, decrementSpots }from '../helpers/selectors'


export default function useApplicationData(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

    useEffect(() => {Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });

    }, [])


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = decrementSpots(state);
    
    return  axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
        ...state,
        appointments,
        days
        })
      })
      
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = incrementSpots(state);

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
        ...state,
        appointments,
        days
        })
      })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}


