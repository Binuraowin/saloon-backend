const AppointmentController = require('../controllers/appointmentController');
const express = require("express");
const router = express.Router();


router.get("/", AppointmentController.appointment_get_all);

router.post("/", AppointmentController.appointment_create);

router.get("/:appointmentId",AppointmentController.appointment_get_one);

router.put("/:appointmentId",AppointmentController.appointment_update);

router.delete("/:appointmentId",AppointmentController.appointment_delete);


module.exports = router;
  