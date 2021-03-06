'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Preparation, { foreignKey: 'userId' });
      User.belongsToMany(models.Recipe, { 
        through: 'Preparation',
        foreignKey: 'userId',
        otherKey: 'recipeId'
      });
    }
  };
  User.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'Please, enter your name.'
        //   }
        // }
      },
      username: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'Please, enter your username.'
        //   }
        // }
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'Please, enter your password.'
        //   }
        // }
      }
    }, {
      sequelize,
      // validate: {
      //   dataNull() {
      //     if ( this.name === null || this.username === null || this.password === null) {
      //         throw new Error('Please, check your values aren\'t null');
      //     }
      //   }
      //},
      modelName: 'User',
    });
  return User;
};