// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require(`express`);
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const { request } = require("http");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
//post route to recieve data from client side
app.post("/main", (res, req) => {
  console.log(res.body);
  projectData = res.body;
});
//get route for returning all the end-point data for the client-side
app.get("/all", (res, req) => {
  req.send(projectData);
});
