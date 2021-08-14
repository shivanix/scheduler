import { useState, useEffect } from "react";
import Axios from "axios";


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
   days: [],
   appointments: {},
   interviewers: {}
 });

  /*----------------------------Func bookInterview------------------*/
  
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log(id, interview);
    const days = updateSpots(`create`)
     return Axios.put(`/api/appointments/${id}`,{interview})
    .then((response) => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  /*---------------------------Func cancelInterview -------------------------- */

function cancelInterview (id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = updateSpots();
  return Axios.delete(`/api/appointments/${id}`)
  .then((response) => {
    setState({...state,
      appointments,
      days
    })
  })
}

const setDay = day => setState(prev => ({ ...prev, day }));


useEffect(() => {
  Promise.all([
    Axios.get(`/api/days`),
    Axios.get(`/api/appointments`),
    Axios.get(`/api/interviewers`)
  ]).then((responses) => {

    //responses stores all the reponses in an order in an array
    // responses[0] would be the first reponse; responses[1] would be the 2nd response
    // we want the data from each of the response objects, we access that using '.data'


    //Updating the states with the responses
    setState(prev => ({
      ...prev,
      days: responses[0].data,
      appointments: responses[1].data,
      interviewers: responses[2].data,

    }));

    // const [first, second, third] = responses;
    // console.log("one&2****", first, second, third);
    // console.log("#STATE#", state);
    // console.log("interviewers", third.data);
    // console.log(responses[2].data);
  });

}, [])

/*--------------------------------Func updateSpots------------------- */
// console.log("State$$$", state);
function updateSpots(requestType) {

  const dayIndex = state.days.findIndex(day => day.name === state.day)

  // console.log("%%%%%%##", dayIndex);

  const days = state.days;

  if (requestType === `create`) {
    days[dayIndex].spots -= 1
  } else {
    days[dayIndex].spots += 1
  }

  return days;
}


// console.log("#STATE <3#", state);
return {
  state:state, 
  setDay,
  bookInterview, 
  cancelInterview}
}