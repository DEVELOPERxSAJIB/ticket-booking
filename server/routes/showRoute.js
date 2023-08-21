const express = require("express");;
const verifyToken = require("../helper/verifyToken");
const { createShow } = require("../controllers/showController");

// init router
const showRoute = express.Router();
showRoute.use(verifyToken)

// routes
showRoute.post("/create-show", createShow);

// export user routes
module.exports = showRoute;
