export function getAppointmentsForDay(state, day) {
  const dayArr = state.days;
  const appointmentsForDay = [];

  for (const days of dayArr) {

    if (days.name === day) {
      const appointmentArr = Object.values(state.appointments);

      for (const appointment of appointmentArr) {
        if (days.appointments.includes(appointment.id)) {
          appointmentsForDay.push(appointment)
        }
      }
      return appointmentsForDay;
    } 
  }
  return [];  
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerData = state.interviewers[interview.interviewer]
  return {...interview, interviewer: interviewerData}
}

export function getInterviewersForDay(state, day) {

  const dayArr = state.days;
  const interviewersForDay = [];

  for (const days of dayArr) {

    if (days.name === day) {
      const interviewerArr = Object.values(state.interviewers);

      for (const interviewer of interviewerArr) {
        interviewersForDay.push(interviewer) 
      }
      return interviewersForDay;
    } 
  }
  return [];  
}
