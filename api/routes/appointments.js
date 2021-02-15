const AppointmentController = require('../controllers/appointmentController');
const express = require("express");
const router = express.Router();


router.get("/", AppointmentController.appointment_get_all);

router.post("/", AppointmentController.appointment_create);

module.exports = router;
  