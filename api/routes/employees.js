const EmployeeController = require('../controllers/employeeController');
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get("/",EmployeeController.get_all_employee);

router.post("/",EmployeeController.employee_create);

router.get("/:employeeId",EmployeeController.get_one_employee);

router.post("/login",EmployeeController.employee_login);

router.delete("/:employeeId",EmployeeController.employee_delete);

module.exports = router;
