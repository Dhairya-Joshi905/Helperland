// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestExtra extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestExtra.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     ServiceExtraId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestExtra',
//   });
//   return ServiceRequestExtra;
// };

import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class ServiceRequestExtra extends Model {
  id!: number;
  ServiceRequestId!: number;
  ServiceExtraId!: number;
  createdAt!: Date;
  updatedAt!: Date;
};

export const ServiceRequestExtraModelAttributes: ModelAttributes = {
  
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  ServiceRequestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ServiceRequest',
      key: 'id'
    }
  },
  
  ServiceExtraId: {
    type: DataTypes.INTEGER,
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