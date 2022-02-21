// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ZipCode extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ZipCode.init({
//     ZipcodeValue: DataTypes.STRING,
//     CityId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ZipCode',
//   });
//   return ZipCode;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ZipCode extends Model {
  id!: number;
  ZipcodeValue!: string;
  CityId!: number;
  createdAt!: Date;
  updatedAt!: Date;
};

export const ZipCodeModelAttributes: ModelAttributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  
  ZipcodeValue: {
    type: DataTypes.STRING,
    allowNull: false
  },

  CityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'City',
      key: 'id'
    }
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