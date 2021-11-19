export default function getAppointmentsForDay(state, day) {
  const dayArr = state.days;
  const appointmentsForDay = [];

  for (const days of dayArr) {

    if (days.name === day) {
      const appointmentArr = Object.values(state.appointments);

      for (const appointment of appointmentArr) {
        console.log(appointment)
        if (days.appointments.includes(appointment.id)) {
          appointmentsForDay.push(appointment)
        }
      }
      return appointmentsForDay;
    } 
  }
  return [];  
} 
  

