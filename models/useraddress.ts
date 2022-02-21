// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UserAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UserAddress.init({
//     UserId: DataTypes.INTEGER,
//     AddressLine1: DataTypes.STRING,
//     AddressLine2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     IsDefault: DataTypes.BOOLEAN,
//     IsDeleted: DataTypes.BOOLEAN,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Type: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'UserAddress',
//   });
//   return UserAddress;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class UserAddress extends Model {
  id!: number;
  UserId!: number;
  AddressLine1!: string;
  AddressLine2?: string;
  City!: string;
  State?: string;
  PostalCode!: string;
  IsDefault!: boolean;
  IsDeleted!: boolean;
  Mobile?: string;
  Email?: string;
  Type?: number;
  createdAt!: Date;
  updatedAt!: Date;
};

export const UserAddressModelAttributes: ModelAttributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  
  AddressLine1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  AddressLine2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  City: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  State: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  PostalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },

  IsDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

  IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
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