 function getAppointmentsForDay(state, day) {

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



/*------------------------------------------------------ */

function getInterview(state, interview) {
// console.log("stateeeeeee", state);
// console.log("interviewObject", interview);  

// console.log("dffffffffff", state.interviewers["1"]);

let output = {};

try{
if (state.interviewers[interview.interviewer]) {
  output["student"] = interview.student;
  output["interviewer"] = state.interviewers[interview.interviewer];

  return output;
}
}
catch(err){
  // console.log("erorrrrrrrr", err);
  return null
}

}
/*-------------------------------------------------------------------------------- */
function getInterviewersForDay(state, day) {

  const found = state.days.find(d => day === d.name);

  if (state.days.length === 0 || found === undefined) return [];

  return found.interviewers.map(id => state.interviewers[id]);
  }

export {getAppointmentsForDay, getInterview, getInterviewersForDay}