// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class SysDiagrams extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   SysDiagrams.init({
//     Name: DataTypes.STRING,
//     PrincipalId: DataTypes.INTEGER,
//     Version: DataTypes.INTEGER,
//     Definition: DataTypes.BLOB
//   }, {
//     sequelize,
//     modelName: 'SysDiagrams',
//   });
//   return SysDiagrams;
// };

import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class SysDiagrams extends Model {
  id!: number;
  Name!: string;
  PrincipalId!: number;
  Version?: number;
  Definition?: Blob;
  createdAt!: Date;
  updatedAt!: Date;
};

export const SysDiagramsModelAttributes: ModelAttributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  PrincipalId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  Version: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  Definition: {
    type: DataTypes.BLOB,
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