const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const { verifyToken } = require("../middleware/verify");

router.use(verifyToken);
router.post("/", TaskController.createTasks);
router.get("/", verifyToken, TaskController.getAllTaks);
router.get("/:id", TaskController.getByIdTasks);
router.put("/:id", TaskController.updateTasks);
router.delete("/:id", TaskController.deleteTasks);

module.exports = router;
