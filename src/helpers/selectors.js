export function getAppointmentsForDay(state, day) {

let filteredDays = [];
let filteredIDs = [];
let filteredAppointments = [];

//Find the days that match with the desired day
for(let selectedDay of state.days){
  if(selectedDay.name===day){
    // console.log("selectedDay: ", selectedDay);
    filteredDays.push(selectedDay);
  }
}

//Get the appointment ids from the filteredDays
for (const dayAppointmentObj of filteredDays) {
  for(const apps of dayAppointmentObj.appointments){
    filteredIDs.push(apps);
  }
}

//Get the appointment objects based on the desired ids
for (const id of filteredIDs) {
  if(state.appointments[id]){
    filteredAppointments.push(state.appointments[id]);
  }
}

// console.log("filteredDays: ", filteredDays);
// console.log("filteredIDs: ", filteredIDs);
// console.log("filteredAppointments: ", filteredAppointments);
return filteredAppointments;
}

