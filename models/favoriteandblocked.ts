// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FavoriteAndBlocked extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FavoriteAndBlocked.init({
//     UserId: DataTypes.INTEGER,
//     TargetUserId: DataTypes.INTEGER,
//     IsFavorite: DataTypes.BOOLEAN,
//     IsBlocked: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'FavoriteAndBlocked',
//   });
//   return FavoriteAndBlocked;
// };

import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class FavoriteAndBlocked extends Model {
  id!: number;
  UserId!: number;
  TargetUserId!: number;
  IsFavorite!: boolean;
  IsBlocked!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
};

export const FavoriteAndBlockedModelAttributes: ModelAttributes = {
  
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },

  UserId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },

  TargetUserId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  
  IsFavorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

  IsBlocked: {
    type: DataTypes.BOOLEAN,
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