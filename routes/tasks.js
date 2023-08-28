const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.getAllTaks);
router.post("/", TaskController.createTasks);
router.put("/:id", TaskController.updateTasks);
router.delete("/:id", TaskController.deleteTasks);

module.exports = router;
