const express = require('express');
const dbConnection = require('../database/Config');
const WorkerController = require("../controllers/WorkerController");

const router = express.Router();

router.get("/Trabajadores",WorkerController.trabajadores);
router.get("/Trabajador/:trabajador_ID",WorkerController.trabajadorID);
router.post("/AddTrabajador",WorkerController.addTrabajador);
router.put("/UpdateTrabajador",WorkerController.updateTrabajador);
router.delete("/DeleteTrabajador/:id",WorkerController.destroyTrabajador);

module.exports = router;