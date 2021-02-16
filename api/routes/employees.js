const EmployeeController = require('../controllers/employeeController');
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get("/",EmployeeController.get_all_employee);

router.post("/signup",EmployeeController.employee_signup);

router.post("/login",EmployeeController.employee_login)

router.delete("/:employeeId",checkAuth,EmployeeController.employee_delete);

module.exports = router;
