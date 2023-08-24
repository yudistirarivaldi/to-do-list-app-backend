const { Tasks } = require("../models");
const dayjs = require("dayjs");
const Sequelize = require("sequelize");

module.exports = {
  createTasks: async (req, res) => {
    try {
      const { id } = req.user;
      const complicationDate = new Date(req.body.date);

      const newTask = await Tasks.create({
        ...req.body,
        user_id: id,
        date: complicationDate,
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

  getAllTaks: async (req, res) => {
    try {
      const { id } = req.user;
      const { type, day } = req.query;

      const whereOptions = { user_id: id };

      if (type) {
        whereOptions.type = type;
      }

      if (day) {
        let startDate = dayjs();

        if (day === "seven") {
          startDate = dayjs().subtract(7, "day");
        } else if (day === "thirty") {
          startDate = dayjs().subtract(30, "day");
        }

        whereOptions.date = {
          [Sequelize.Op.gte]: startDate.toDate(),
        };
      }

      const tasks = await Tasks.findAll({
        where: whereOptions,
        attributes: ["id", "type", "status", "name", "date", "time", "user_id"],
      });

      res.status(200).json({
        status: "success",
        message: "Successfully get data",
        data: tasks,
      });
    } catch (error) {
      // res.status(500).json({ error: "Error retrieving with server" });
      console.log(error);
    }
  },

  getByIdTasks: async (req, res) => {
    try {
      const { id } = req.params;

      const tasks = await Tasks.findByPk(id, {
        attributes: ["id", "type", "status", "name", "date", "time"],
      });

      if (!tasks) {
        return res.status(404).json({ message: "Not found tasks" });
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get data",
        data: tasks,
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
          ...req.body,
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
