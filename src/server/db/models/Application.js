'use strict';

module.exports = function(sequelize, DataTypes) {
  var Application = sequelize.define('application', {
    gender: {
      type: DataTypes.ENUM('female', 'male'),
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 99 },
    },
    zip: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Application;
};
