"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tasks.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Tasks.init(
    {
      user_id: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ["default", "personal", "shooping", "whislist", "work"],
        defaultValue: "default",
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "completed"],
        defaultValue: "pending",
      },
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
