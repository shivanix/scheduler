import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();

})

/*-----------------------Booking an interview-------------------------- */

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {

const { container, debug } = render(<Application />);

 // 2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));

const appointments = getAllByTestId(container, "appointment");
const appointment = getAllByTestId(container, "appointment")[0];

// 3. Click the "Add" button on the first empty appointment.
fireEvent.click(getByAltText(appointment, "Add"));

// 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});

// 5. Click the first interviewer in the list.
fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

// 6. Click the "Save" button on that same appointment.
fireEvent.click(getByText(appointment, "Save"));

// 7. Check that the element with the text "Saving" is displayed.
expect(getByText(appointment, "Saving")).toBeInTheDocument();

// 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

// 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);


expect(getByText(day, "no spots remaining")).toBeInTheDocument();
console.log(prettyDOM(day));
// debug();
  })


/*-----------------------Cancelling an interview-------------------------- */

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
  // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you really sure you want to nuke this interview? 🤔")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });


  /*---------------------------------Editing an intervew-------------------- */
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
      const { container, debug } = render(<Application />);
    
  // 2. Wait until the text "Archie Cohen" is displayed.
       await waitForElement(() => getByText(container, "Archie Cohen"));
  
  // 3. Click the "Edit" button on the booked appointment.
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});
  
fireEvent.click(getByAltText(appointment, "Tori Malcolm"));  
  // 5. Click the "Save" button on that same appointment.

fireEvent.click(getByText(appointment, "Save"));
  
// 7. Check that the element with the text "Saving" is displayed.
expect(getByText(appointment, "Saving")).toBeInTheDocument();

await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

      
const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
      );
 expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  
      debug();

    
});


/*------------------------------Show error when failing to save----------------------- */
it("shows the save error when failing to save an appointment", async () => {

   // 1. Render the Application.
   const { container, debug } = render(<Application />);
    
   // 2. Wait until the text "Archie Cohen" is displayed.
        await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  fireEvent.click(getByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));


  axios.put.mockRejectedValueOnce();

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Oops! Could not save this appointment!"));

  expect(getByText(appointment, "Oops! Could not save this appointment!")).toBeInTheDocument();

  fireEvent.click(queryByAltText(appointment, "Close"));


  expect(getByDisplayValue(container, "Archie Cohen")).toBeInTheDocument();

  
});



/*------------------------------Show error when failing to delete--------------------- */
it("shows the delete error when failing to delete an existing appointment", async () =>{
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
    
  // 2. Wait until the text "Archie Cohen" is displayed.
       await waitForElement(() => getByText(container, "Archie Cohen"));
  
  // 3. Click the "Delete" button on the booked appointment.
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

     // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you really sure you want to nuke this interview? 🤔")).toBeInTheDocument();

  axios.delete.mockRejectedValueOnce();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Check that the element with the text of error is displayed.
  // expect(getByText(appointment, "Server doesn't want to cancel this appointment!")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Server doesn't want to cancel this appointment!"));

  expect(getByText(appointment, "Server doesn't want to cancel this appointment!")).toBeInTheDocument();

  fireEvent.click(queryByAltText(appointment, "Close"));

  expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
 
})

});
