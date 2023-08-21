const express = require("express");
const {
  getAllTheatre,
  createTheatre,
  statusChangeTheatre,
  deleteTheatre,
  getSingleTheatre,
} = require("../controllers/theatreController");
const verifyToken = require("../helper/verifyToken");

// init router
const theatreRoute = express.Router();
theatreRoute.use(verifyToken);

// routes
theatreRoute.get("/", getAllTheatre);
theatreRoute.post("/create-theatre", createTheatre);
theatreRoute.put("/change-theatre-status/:id", statusChangeTheatre);
theatreRoute.delete("/delete-theatre/:id", deleteTheatre);
theatreRoute.get("/single-theatre/:id", getSingleTheatre);

// export user routes
module.exports = theatreRoute;
