import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

import axios from "axios";

// Set the base URL for API calls:

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}
// Set the base URL for API calls:
// axios.defaults.baseURL = `${new URL(
//   process.env.REACT_APP_API_BASE_URL ||
//   window.location
// ).origin}/api`;

ReactDOM.render(<Application />, document.getElementById("root"));

/*ReactDom.render takes 2 parameters: 
here (1st parameter) Application func is the element/componenet, and it puts it inside the container "root"(2nd parameter)

--in short: build something and put inside a container
---------------------------------------
JQuery equivalent would be: 
 e.g. const app = <div>Hello World</div>;
 $("#root").append(Application)
---------------------------------------
*/


/*Webpack wont be able to detect changes to Application func if it is inside index.js

That is why Application func has its own file Application.js

*/
