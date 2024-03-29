import React from "react";


export default function Empty(props){
 

  return (
    <main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick = {props.onAdd}
  />
</main>
  )
}

//The add button is an image.
// An image can have an onClick handler just like a button.
// images/add.png is in the public folder.
// This component references that image using the src attribute.
// Clicking on the add button will trigger the onAdd callback
// we will be passing as a prop in our story below.