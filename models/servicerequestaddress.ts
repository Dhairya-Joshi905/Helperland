// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestAddress.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     AddressLine1: DataTypes.STRING,
//     AddressLine2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Type: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestAddress',
//   });
//   return ServiceRequestAddress;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequestAddress extends Model {
  id!: number;
  ServiceRequestId?: number;
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  State?: string;
  PostalCode?: string;
  Mobile?: string;
  Email?: string;
  Type?: number;
  createdAt!: Date;
  updatedAt!: Date;
};

export const ServiceRequestAddressModelAttributes: ModelAttributes = {
  
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  ServiceRequestId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ServiceRequest',
      key: 'id'
    }
  },
  
  AddressLine1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  AddressLine2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  City: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  State: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  PostalCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  Mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },

  Type: {
    type: DataTypes.INTEGER,
    allowNull: true
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