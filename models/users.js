const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      user_name: {
        type: DataTypes.STRING,
        notNull: true,
      },
      p5_balance: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
      reward_balance: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true, 
      tableName: "users",
    }
  );
  Users.associate = (models) => {
    console.log(models, "=====models");
    Users.hasMany(models.RewardHistory, {
      foreignKey: "given_by_id",
      sourceKey: "id",
    });
    Users.hasMany(models.RewardHistory, {
      foreignKey: "given_to_id",
      sourceKey: "id",
    });
  };
  return Users;
};