// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Subscribe extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Subscribe.init({
//     Email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Subscribe',
//   });
//   return Subscribe;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Subscribe extends Model {
  
  id!: number;
  
  Email!: string;
  
  createdAt!: Date;
  
  updatedAt!: Date;
};

export const SubscribeModelAttributes: ModelAttributes = {
  
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
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