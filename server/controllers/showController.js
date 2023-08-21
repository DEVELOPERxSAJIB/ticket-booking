const Show = require("../models/Show");
const { successResponse } = require("./responseController");

/**
 * @DESC Create Show
 * @ROUTE api/v1/show/create-show
 * @method POST
 * @access Private
 */
const getAllShow = (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

/**
 * @DESC Create Show
 * @ROUTE api/v1/show/create-show
 * @method POST
 * @access Private
 */
// create a show
const createShow = async (req, res, next) => {
  try {
    const { name, date, time, ticketPrice, movie, totalSeats } = req.body;

    const show = await Show.create({
      name,
      date,
      time,
      movie,
      ticketPrice,
      totalSeats,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Shows added successfully",
      payload: { show },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createShow }