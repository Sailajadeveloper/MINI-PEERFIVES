const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const RewardHistory = sequelize.define(
    "RewardHistory",
    {
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      given_by: {
          type: DataTypes.INTEGER,
      },
      given_to: {
          type: DataTypes.INTEGER,
      },
      timestamp: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: true,
      underscored: true, 
      tableName: "reward_history",
    }
  );
  RewardHistory.associate = (models) => {
    console.log(models, "=====models");
    RewardHistory.belongsTo(models.Users, {
      foreignKey: 'given_by_id',
      sourceKey: 'id'
    });
    RewardHistory.belongsTo(models.Users, {
      foreignKey: 'given_to_id',
      sourceKey: 'id'
    });
  };
  return RewardHistory;
};