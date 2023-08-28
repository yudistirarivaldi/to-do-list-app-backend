const { Tasks } = require("../models");
const dayjs = require("dayjs");
const Sequelize = require("sequelize");

module.exports = {
  createTasks: async (req, res) => {
    try {
      const newTask = await Tasks.create({
        ...req.body,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully create data",
        data: newTask,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving with server" });
    }
  },

  updateTasks: async (req, res) => {
    try {
      const { id } = req.params;

      const findTasks = await Tasks.findByPk(id);

      if (!findTasks) {
        return res.status(404).json({
          message: "Tasks not found",
        });
      }

      const updateTasks = await Tasks.update(
        {
          done: true,
        },
        {
          where: { id: id },
          returning: true,
        }
      );

      res.status(200).json({
        status: "success",
        message: "Successfully update data",
        data: updateTasks[1][0],
      });
    } catch (error) {
      // res.status(500).json({ error: "Error retrieving with server" });
      res.status(500).json({ error: error });
    }
  },

  getAllTaks: async (req, res) => {
    try {
      const tasks = await Tasks.findAll();

      res.status(200).json({
        status: "success",
        message: "Successfully get data",
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving with server" });
    }
  },

  deleteTasks: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteTasks = await Tasks.destroy({
        where: {
          id: id,
        },
        returning: true,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully delete data",
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving with server" });
    }
  },
};
