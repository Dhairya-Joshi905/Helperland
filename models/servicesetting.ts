// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceSetting extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceSetting.init({
//     ActionType: DataTypes.INTEGER,
//     Interval: DataTypes.STRING,
//     ScheduleTime: DataTypes.DATE,
//     LastPoll: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'ServiceSetting',
//   });
//   return ServiceSetting;
// };

import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class ServiceSetting extends Model {
  id!: number;
  ActionType!: number;
  Interval!: number;
  ScheduleTime!: Date;
  LastPoll!: Date;
  createdAt!: Date;
  updatedAt!: Date;
};

export const ServiceSettingModelAttributes: ModelAttributes = {
  
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  ActionType: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  Interval: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  ScheduleTime: {
    type: DataTypes.DATE,
    allowNull: false
  },

  LastPoll: {
    type: DataTypes.DATE,
    allowNull: false
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}