const router = require("express").Router();
const controller = require('./employee.controller')

router.get("/employee", controller.getAllEmployee);
router.get("/employee/:employeeId", controller.getSingleEmployee);
router.post("/employee", controller.createNewEmployee);
router.put("/employee", controller.updateEmployee);
router.delete("/employee/:employeeId", controller.deleteEmployee);
module.exports = router;